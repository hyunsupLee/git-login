// LoginPage.js
import React, { useState, useEffect } from "react";
import { useAuth } from "../supabase/AuthContext";
import supabase, {
  signInWithGithub,
  signEmail,
  signOut,
} from "../supabase/supabase";
import TextInput from "../components/TextInput";
import styles from "../styles/LoginPage.module.css";

export default function LoginPage() {
  const { isLoggedIn, loginInfo, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [animate, setAnimate] = useState(false);

  const handleLogin = async () => {
    if (errors.email || errors.password) {
      alert("입력한 정보를 다시 확인하세요.");
      return;
    }
    await signEmail(email, password);
  };

  const handleLogout = async () => {
    await signOut();
    setEmail("");
    setPassword("");
  };

  const handleRegister = () => {
    alert("회원가입 기능은 아직 구현되지 않았습니다.");
  };

  useEffect(() => {
    setAnimate(true);
  }, []);

  if (loading) return <div>로딩 중...</div>;

  return (
    <div className={styles.container}>
      <div
        className={`${styles.card} ${styles.cardAnimateEnter} ${
          animate ? styles.cardAnimateEnterActive : ""
        }`}
      >
        {!isLoggedIn ? (
          <>
            <h2 className={styles.title}>이메일 로그인</h2>

            <TextInput
              type="email"
              placeholder="Email"
              value={email}
              onChange={setEmail}
              name="email"
              setError={(field, msg) =>
                setErrors((prev) => ({ ...prev, [field]: msg }))
              }
            />
            <TextInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={setPassword}
              name="password"
              setError={(field, msg) =>
                setErrors((prev) => ({ ...prev, [field]: msg }))
              }
            />

            <div className={styles.buttonRow}>
              <button
                onClick={handleLogin}
                className={`${styles.loginButton} ${styles.hoverNeonGreen}`}
              >
                이메일 로그인
              </button>
              <button
                onClick={handleRegister}
                className={`${styles.registerButton} ${styles.hoverNeonBlue}`}
              >
                이메일 회원가입
              </button>
            </div>

            <hr className={styles.hr} />
            <button
              className={`${styles.githubButton} ${styles.hoverNeon}`}
              onClick={signInWithGithub}
            >
              Github 로그인
            </button>
          </>
        ) : (
          <>
            <h2 className={styles.title}>환영합니다!</h2>
            <p className={styles.info}>로그인 이메일: {loginInfo?.email}</p>
            <button
              onClick={handleLogout}
              className={`${styles.logoutButton} ${styles.hoverNeonRed}`}
            >
              로그아웃
            </button>
          </>
        )}
        <p style={{ fontSize: 10, color: "#585858", textAlign: "center" }}>
          supabase email , github login
        </p>
      </div>
    </div>
  );
}
