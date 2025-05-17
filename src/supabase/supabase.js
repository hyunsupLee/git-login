import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const redirectURI = "http://localhost:3000";

//// Email login //////
export async function signEmail(email, password, execute) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
      options: {
        redirectTo: supabase.redirectURI,
      },
    });

    if (error) {
      alert("로그인 실패: " + error.message);
    } else {
      console.log("로그인 성공!");
      const token = data.session.access_token;
      console.log("🔐 access_token:", token);
      if (execute) execute();
      console.log("로그인 성공! execute");
    }
  } catch (err) {
    alert("로그인 오류: " + err.message);
  }
}

//// Github social login //////
export async function signInWithGithub() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: redirectURI,
    },
  });
  if (error) {
    console.error("로그인 실패:", error.message);
    alert("로그인 실패: " + error.message);
  }
}

//// login out //////
export async function signOut(execute = null) {
  try {
    console.log("signout.......");
    await supabase.auth.signOut();
    if (execute) execute();
  } catch (err) {
    console.error("로그아웃 오류:", err);
    alert("로그아웃 중 오류가 발생했습니다.");
  }
}

export default supabase;
