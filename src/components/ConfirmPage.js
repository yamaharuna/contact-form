import React, { useState } from "react";
import "./ContactForm.css";

export default function ConfirmPage({ formData, onBack, onSubmit }) {
  // 送信状態とエラー管理
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [debugInfo, setDebugInfo] = useState("");

  const handleSend = async () => {
    if (sending) return;
    setSending(true);
    setError("");
    setDebugInfo("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const text = await res.text(); // 生テキスト取得
      let json;
      try { json = JSON.parse(text); } catch (_) {}
      setDebugInfo(`status: ${res.status}\nbody: ${text.substring(0,300)}`);
      if (!res.ok || !json || !json.ok) {
        throw new Error(json && json.error ? json.error : "send_failed");
      }
      setSuccess(true);
      onSubmit(); // 成功画面へ遷移
    } catch (e) {
      const map = {
        bad_request: "入力値が不正です。",
        server_not_configured: "サーバ設定が未完了 (環境変数不足)。",
        send_failed: "送信に失敗しました。時間を置いて再度お試しください。",
        method_not_allowed: "不正なHTTPメソッドです。",
      };
      setError(map[e.message] || `送信エラー: ${e.message}`);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="form-wrapper"> {/* フォーム＋ボタン全体の親 */}

      {/* 確認内容の枠 */}
      <div className="confirm-container">
        <p>入力内容にお間違えないかご確認ください。</p>
        <p><strong>氏名</strong> {formData.name}</p>
        <p><strong>メールアドレス</strong> {formData.email}</p>
        <p><strong>サービス</strong> {formData.service}</p>
        <p><strong>カテゴリー</strong> {formData.category}</p>
        <p><strong>プラン</strong> {formData.plan.join(", ")}</p>
        <p><strong>お問い合わせ内容</strong> {formData.message}</p>
        {error && <p className="error-message" style={{ marginTop: "8px" }}>{error}</p>}
        {debugInfo && <pre style={{ background:'#f6f6f6', padding:'8px', fontSize:'12px', whiteSpace:'pre-wrap' }}>{debugInfo}</pre>}
      </div>

      {/* ボタン */}
      <div className="button-container">
        <button type="button" className="back-button" onClick={onBack} disabled={sending}>
          入力画面に戻る
        </button>
        <button
          type="button"
          className="submit-button"
          onClick={handleSend}
          disabled={sending}
          style={{ marginLeft: "10px" }}
        >
          {sending ? "送信中..." : "送信する"}
        </button>
      </div>

    </div>
  );
}
