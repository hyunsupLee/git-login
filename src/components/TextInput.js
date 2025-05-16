import React, { useState, useEffect } from "react";
import styles from "../styles/LoginPage.module.css";

const validators = {
  email: (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ? ""
      : "유효한 이메일을 입력하세요",
  password: (value) =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/.test(
      value
    )
      ? ""
      : "8자리 이상, 영문/숫자/기호 조합 필요",
  number: (value) => (/^\d+$/.test(value) ? "" : "숫자만 입력하세요"),
  default: () => "",
};

export default function TextInput({
  type = "default",
  placeholder,
  value,
  onChange,
  setError,
  name,
}) {
  const [error, setLocalError] = useState("");

  useEffect(() => {
    const validate = validators[type] || validators.default;
    const message = validate(value);
    setLocalError(message);
    setError && setError(name, message); // 외부 에러 상태 업데이트
  }, [value]);

  return (
    <div>
      <input
        type={
          type === "password" || type === "email" || type === "number"
            ? type
            : "text"
        }
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.input}
      />
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
