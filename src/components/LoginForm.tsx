import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import { useRouter } from "next/router";
import {
  getAuth,
  signInWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import firebaseApp from "../lib/firebase"; // Firebaseの初期化

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const auth = getAuth(firebaseApp);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // エラーメッセージをリセット
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const idToken = await user.getIdToken();

      // トークンをローカルストレージに保存
      localStorage.setItem("token", idToken);

      await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ email }),
      });
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      setError(
        "ログインに失敗しました。メールアドレスとパスワードを確認してください。"
      );
    }
  };

  const handleOAuthLogin = async (provider: any) => {
    setError(null); // エラーメッセージをリセット
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const idToken = await userCredential.user.getIdToken();

      // トークンをローカルストレージに保存
      localStorage.setItem("token", idToken);

      await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ email: userCredential.user.email }),
      });
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      setError("OAuthログインに失敗しました。再度お試しください。");
    }
  };

  const handleCreateAccount = () => {
    router.push("/users/signup");
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className={styles.mainContainer}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="Eploy Logo" className={styles.logoImage} />
        </div>
      </header>
      <div className={styles.container}>
        <form className={styles.formContainer} onSubmit={handleLogin}>
          <div className={styles.emailContainer}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.passwordContainer}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <div className={styles.passwordInputContainer}>
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                placeholder="Password"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className={styles.togglePasswordButton}
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.button}>
            Login
          </button>
          <div className={styles.forgotPassword}>
            <a href="#">Forgot your password?</a>
          </div>
        </form>
        <div className={styles.createAccountContainer}>
          <button
            type="button"
            className={styles.createAccountButton}
            onClick={handleCreateAccount}
          >
            Create an account
          </button>
        </div>
        <div className={styles.separator}>
          <hr className={styles.separatorLine} />
          <span>OR</span>
          <hr className={styles.separatorLine} />
        </div>
        <div className={styles.otherLoginMethods}>
          <button
            className={styles.otherLoginButton}
            onClick={() => handleOAuthLogin(new GithubAuthProvider())}
          >
            <img src="/github.png" alt="GitHub" className={styles.icon} />
            Sign in with GitHub
          </button>
          <button
            className={styles.otherLoginButton}
            onClick={() => handleOAuthLogin(new GoogleAuthProvider())}
          >
            <img src="/google.png" alt="Google" className={styles.icon} />
            Sign in with Google
          </button>
          <button
            className={styles.otherLoginButton}
            onClick={() => handleOAuthLogin(new TwitterAuthProvider())}
          >
            <img src="/x.png" alt="X" className={styles.icon} />
            Sign in with X
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
