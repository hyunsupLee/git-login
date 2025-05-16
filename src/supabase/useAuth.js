// hooks/useAuth.js
import { useState, useEffect } from "react";
import supabase from "./supabase";

export default function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginInfo, setLoginInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setIsLoggedIn(true);
        setLoginInfo({ email: session.user.user_metadata.email });
      } else {
        setIsLoggedIn(false);
        setLoginInfo(null);
      }
      setLoading(false);
    };

    checkSession();

    // 실시간 로그인 상태 변경 감지
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          setIsLoggedIn(true);
          setLoginInfo({ email: session.user.user_metadata.email });
        } else {
          setIsLoggedIn(false);
          setLoginInfo(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return { isLoggedIn, loginInfo, loading };
}
