import React, { useState } from "react";
import ConfirmPage from "./ConfirmPage";
import SuccessPage from "./ThankYouPage";
import "./ContactForm.css";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "サービスA",
    category: "",
    plan: [],
    message: "",
  });

  const [page, setPage] = useState("form");
  const [errors, setErrors] = useState({}); // ← エラーメッセージ管理

  const handleChange = (e) => {
  const { name, value } = e.target;

  // お問い合わせ内容の文字数チェック
  if (name === "message") {
    if (value.length > 100) {
      setErrors((prev) => ({
        ...prev,
        message: "100文字以内で入力してください。",
      }));
      return; // 入力を止める
    } else {
      setErrors((prev) => ({ ...prev, message: "" }));
    }
  } else {
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  if (name === "service") {
    setFormData({
      ...formData,
      service: value,
      category: "",
      plan: [],
    });
  } else {
    setFormData({ ...formData, [name]: value });
  }
};


  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      plan: checked
        ? [...prev.plan, value]
        : prev.plan.filter((p) => p !== value),
    }));
  };

  const validateForm = () => {
  const newErrors = {};
  
  if (!formData.name.trim()) newErrors.name = "氏名は必須です。";
  
  if (!formData.email.trim()) {
    newErrors.email = "メールアドレスは必須です。";
  } else {
    // メール形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "正しいメールアドレスを入力してください。";
    }
  }
  
  if (!formData.service.trim()) newErrors.service = "サービスを選択してください。";
  if (!formData.category.trim()) newErrors.category = "カテゴリーを選択してください。";
  if (!formData.message.trim()) newErrors.message = "お問い合わせ内容を入力してください。";
  
  return newErrors;
};


  const handleConfirm = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // エラーがある場合は確認画面へ進まない
    }
    setPage("confirm");
  };

  const handleBack = () => setPage("form");
  const handleSubmit = () => setPage("success");

  const handleResetAndReturn = () => {
    setFormData({
      name: "",
      email: "",
      service: "サービスA",
      category: "",
      plan: [],
      message: "",
    });
    setErrors({});
    setPage("form");
  };

  // サービスに応じたカテゴリー・プラン
  const categoryOptions = {
    サービスA: [
      { value: "カテゴリー1", label: "カテゴリー1" },
      { value: "カテゴリー2", label: "カテゴリー2" },
      { value: "カテゴリー3", label: "カテゴリー3" },
    ],
    サービスB: [
      { value: "カテゴリー4", label: "カテゴリー4" },
      { value: "カテゴリー5", label: "カテゴリー5" },
      { value: "カテゴリー6", label: "カテゴリー6" },
    ],
    サービスC: [
      { value: "カテゴリー7", label: "カテゴリー7" },
      { value: "カテゴリー8", label: "カテゴリー8" },
      { value: "カテゴリー9", label: "カテゴリー9" },
    ],
  };

  const planOptions = {
    サービスA: [
      { value: "プランa", label: "プランa" },
      { value: "プランb", label: "プランb" },
      { value: "プランc", label: "プランc" },
    ],
    サービスB: [
      { value: "プランd", label: "プランd" },
      { value: "プランe", label: "プランe" },
      { value: "プランf", label: "プランf" },
    ],
    サービスC: [
      { value: "プランg", label: "プランg" },
      { value: "プランh", label: "プランh" },
      { value: "プランi", label: "プランi" },
    ],
  };

  const currentCategories = categoryOptions[formData.service] || [];
  const currentPlans = planOptions[formData.service] || [];

  if (page === "confirm") {
    return (
      <ConfirmPage
        formData={formData}
        onBack={handleBack}
        onSubmit={handleSubmit}
      />
    );
  }

  if (page === "success") {
    return <SuccessPage onBackToForm={handleResetAndReturn} />;
  }

  return (
    <>
      <div className="form-container">
        <form>
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
              placeholder="山田太郎"
              className={`form-input ${errors.name ? "error" : ""}`}
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>

          {/* メール */}
          <div className="form-row">
            <label className="form-label">
              メールアドレス<span className="required">必須</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="mail@example.com"
              className={`form-input ${errors.email ? "error" : ""}`}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
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
              className={`form-input ${errors.service ? "error" : ""}`}
            >
              <option value="サービスA">サービスA</option>
              <option value="サービスB">サービスB</option>
              <option value="サービスC">サービスC</option>
            </select>
            {errors.service && <p className="error-message">{errors.service}</p>}
          </div>

          {/* カテゴリー */}
          {currentCategories.length > 0 && (
            <div className="form-row">
              <label className="form-label">
                カテゴリー<span className="required">必須</span>
              </label>
              <div className="form-options">
                {currentCategories.map((cat) => (
                  <label key={cat.value}>
                    <input
                      type="radio"
                      name="category"
                      value={cat.value}
                      checked={formData.category === cat.value}
                      onChange={handleChange}
                    />
                    {cat.label}
                  </label>
                ))}
              </div>
              {errors.category && (
                <p className="error-message">{errors.category}</p>
              )}
            </div>
          )}

          {/* プラン */}
          {currentPlans.length > 0 && (
            <div className="form-row">
              <label className="form-label">プラン</label>
              <div className="form-options">
                {currentPlans.map((plan) => (
                  <label key={plan.value}>
                    <input
                      type="checkbox"
                      name="plan"
                      value={plan.value}
                      checked={formData.plan.includes(plan.value)}
                      onChange={handleCheckboxChange}
                    />
                    {plan.label}
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* お問い合わせ内容 */}
          <div className="form-row">
            <label className="form-label">
              お問い合わせ内容<span className="required">必須</span>
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              placeholder="お問い合わせ内容をご記入ください。"
              maxLength={100} // 文字数制限
              className={`form-input ${errors.message ? "error" : ""}`}
            />
           
            {errors.message && <p className="error-message">{errors.message}</p>}
          </div>
        </form>
      </div>

      {/* ボタン */}
      <div className="button-container">
        <button type="button" className="submit-button" onClick={handleConfirm}>
          確認画面に進む
        </button>
      </div>
    </>
  );
}
