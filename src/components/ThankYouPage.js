import React from "react";
import "./ContactForm.css";

export default function ThankYouPage({ onBackToForm }) {
  return (
    <div className="thankyou-page">
      <h3>お問い合わせが送信されました。</h3>
      <p>担当者から折り返しご連絡いたしますので、ご回答をお待ちください。</p>

      <div className="button-container">
        <button className="back-button" onClick={onBackToForm}>
          入力画面に戻る
        </button>
      </div>
    </div>
  );
}
