const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  let body = req.body;
  try {
    if (typeof body === 'string') body = JSON.parse(body || '{}');
  } catch (e) {
    return res.status(400).json({ error: 'invalid_json' });
  }

  const { name, email, service, category, plan = [], message } = body || {};

  // Validation
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!name || !emailRe.test(email || '') || !message || message.length > 100) {
    return res.status(400).json({ error: 'bad_request' });
  }

  // 必須環境変数 (管理者宛メールは送らないので ADMIN_EMAIL は不要)
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, FROM_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !FROM_EMAIL) {
    return res.status(500).json({ error: 'server_not_configured' });
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: String(SMTP_SECURE).toLowerCase() === 'true',
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  // ユーザー宛メール本文 (送信内容の控え)
  const detail = [
    `氏名: ${name}`,
    `メール: ${email}`,
    `サービス: ${service || ''}`,
    `カテゴリー: ${category || ''}`,
    `プラン: ${(Array.isArray(plan) && plan.length) ? plan.join(', ') : ''}`,
    '',
    'お問い合わせ内容:',
    message,
  ].join('\n');

  const userText = `${name} 様\nお問い合わせありがとうございます。以下の内容で受け付けました。\n\n${detail}\n\n担当よりご連絡いたします。`;

  try {
    await transporter.sendMail({
      from: FROM_EMAIL,
      to: email, // 入力されたユーザー宛のみ送信
      replyTo: FROM_EMAIL,
      subject: 'お問い合わせ受付',
      text: userText,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('SMTP send error:', err);
    return res.status(500).json({ error: 'send_failed' });
  }
};