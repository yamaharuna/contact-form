import React from "react";
import "./ContactForm.css";

export default function ConfirmPage({ formData, onBack, onSubmit }) {
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
      </div>

      {/* ボタン2つ */}
      <div className="button-container">
        <button
          type="button"
          className="back-button"
          onClick={onBack}
        >
          入力画面に戻る
        </button>
        <button
          type="button"
          className="submit-button"
          onClick={onSubmit}
          style={{ marginLeft: "10px" }} 
        >
          送信する
        </button>
      </div>

    </div>
  );
}
