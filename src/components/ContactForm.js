import React, { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    category: "",
    plan: [], // チェックボックス用に配列に変更
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

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto" }}>
      <form onSubmit={handleSubmit}>
        {/* 氏名 */}
        <div style={{ marginBottom: "12px" }}>
          <label>氏名</label><br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        {/* メールアドレス */}
        <div style={{ marginBottom: "12px" }}>
          <label>メールアドレス</label><br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        {/* サービス選択 */}
        <div style={{ marginBottom: "12px" }}>
          <label>サービス</label><br />
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="">選択してください</option>
            <option value="website">サービスA</option>
            <option value="app">サービスB</option>
            <option value="design">サービスC</option>
          </select>
        </div>

        {/* カテゴリー選択（ラジオボタン） */}
<div style={{ marginBottom: "12px" }}>
  <label>カテゴリー</label><br />
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
  </label>{" "}
  <label>
    <input
      type="radio"
      name="category"
      value="development"
      checked={formData.category === "development"}
      onChange={handleChange}
    />{" "}
    カテゴリー2
  </label>{" "}
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


        {/* プラン選択（チェックボックス） */}
        <div style={{ marginBottom: "12px" }}>
          <label>プラン</label><br />
          <label>
            <input
              type="checkbox"
              name="plan"
              value="basic"
              checked={formData.plan.includes("basic")}
              onChange={handleCheckboxChange}
            />{" "}
            プランa
          </label>{" "}
          <label>
            <input
              type="checkbox"
              name="plan"
              value="standard"
              checked={formData.plan.includes("standard")}
              onChange={handleCheckboxChange}
            />{" "}
            プランb
          </label>{" "}
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

        {/* お問い合わせ内容 */}
        <div style={{ marginBottom: "12px" }}>
          <label>お問い合わせ内容</label><br />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button type="submit" style={{ padding: "10px 20px" }}>
          送信
        </button>
      </form>
    </div>
  );
}
