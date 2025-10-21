import React, { useState } from "react";
import "./ContactForm.css";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    category: "",
    plan: [],
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({ ...formData, plan: [...formData.plan, value] });
    } else {
      setFormData({
        ...formData,
        plan: formData.plan.filter((p) => p !== value),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `送信内容:\n氏名: ${formData.name}\nメール: ${formData.email}\nサービス: ${formData.service}\nカテゴリー: ${formData.category}\nプラン: ${formData.plan.join(", ")}\n内容: ${formData.message}`
    );
    setFormData({
      name: "",
      email: "",
      service: "",
      category: "",
      plan: [],
      message: "",
    });
  };

  const handleConfirm = () => {
    alert(
      `確認内容:\n氏名: ${formData.name}\nメール: ${formData.email}\nサービス: ${formData.service}\nカテゴリー: ${formData.category}\nプラン: ${formData.plan.join(", ")}\n内容: ${formData.message}`
    );
  };

  return (
    <div>
      {/* フォーム枠 */}
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          {/* 氏名 */}
          <div className="form-row">
            <label className="form-label">
              氏名<span className="required">必須</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="山田太郎"
              className="form-input"
            />
          </div>

          {/* メールアドレス */}
          <div className="form-row">
            <label className="form-label">
              メールアドレス<span className="required">必須</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="mail@example.com"
              className="form-input"
            />
          </div>

          {/* サービス */}
          <div className="form-row">
            <label className="form-label">
              サービス<span className="required">必須</span>
            </label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="form-input"
            >
              <option value="">選択してください</option>
              <option value="website">サービスA</option>
              <option value="app">サービスB</option>
              <option value="design">サービスC</option>
            </select>
          </div>

          {/* カテゴリー */}
          <div className="form-row">
            <label className="form-label">
              カテゴリー<span className="required">必須</span>
            </label>
            <div className="form-options">
              <label>
                <input
                  type="radio"
                  name="category"
                  value="design"
                  checked={formData.category === "design"}
                  onChange={handleChange}
                  required
                />{" "}
                カテゴリー1
              </label>
              <label>
                <input
                  type="radio"
                  name="category"
                  value="development"
                  checked={formData.category === "development"}
                  onChange={handleChange}
                />{" "}
                カテゴリー2
              </label>
              <label>
                <input
                  type="radio"
                  name="category"
                  value="marketing"
                  checked={formData.category === "marketing"}
                  onChange={handleChange}
                />{" "}
                カテゴリー3
              </label>
            </div>
          </div>

          {/* プラン（チェックボックス） */}
          <div className="form-row">
            <label className="form-label">プラン</label>
            <div className="form-options">
              <label>
                <input
                  type="checkbox"
                  name="plan"
                  value="basic"
                  checked={formData.plan.includes("basic")}
                  onChange={handleCheckboxChange}
                />{" "}
                プランa
              </label>
              <label>
                <input
                  type="checkbox"
                  name="plan"
                  value="standard"
                  checked={formData.plan.includes("standard")}
                  onChange={handleCheckboxChange}
                />{" "}
                プランb
              </label>
              <label>
                <input
                  type="checkbox"
                  name="plan"
                  value="premium"
                  checked={formData.plan.includes("premium")}
                  onChange={handleCheckboxChange}
                />{" "}
                プランc
              </label>
            </div>
          </div>

          {/* お問い合わせ内容 */}
          <div className="form-row">
            <label className="form-label">
              お問い合わせ内容<span className="required">必須</span>
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              placeholder="お問い合わせ内容をご記入ください。"
              className="form-input"
            />
          </div>
        </form>
      </div>

      {/* フォーム枠の外にボタン */}
      <div className="button-container">
        <button
          type="button"
          className="submit-button"
          onClick={handleConfirm}
        >
          確認画面に進む
        </button>
      </div>
    </div>
  );
}
