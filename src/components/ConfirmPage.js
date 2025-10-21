import React from "react";
import "./ContactForm.css";

export default function ConfirmPage({ formData, onBack, onSubmit }) {
  return (
    <div className="form-wrapper"> {/* フォーム＋ボタン全体の親 */}

      {/* 確認内容の枠 */}
      <div className="form-container">
        <h2>確認画面</h2>
        <p><strong>氏名:</strong> {formData.name}</p>
        <p><strong>メール:</strong> {formData.email}</p>
        <p><strong>サービス:</strong> {formData.service}</p>
        <p><strong>カテゴリー:</strong> {formData.category}</p>
        <p><strong>プラン:</strong> {formData.plan.join(", ")}</p>
        <p><strong>お問い合わせ内容:</strong> {formData.message}</p>
      </div>

      {/* 枠の外にボタン2つ */}
      <div className="button-container">
        <button
          type="button"
          className="submit-button"
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
          送信
        </button>
      </div>

    </div>
  );
}
