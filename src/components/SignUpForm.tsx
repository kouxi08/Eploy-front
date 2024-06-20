import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase'; // Firebaseの初期化
import styles from './SignUpForm.module.css';

const SignUpForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); 
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
        },
        body: JSON.stringify({ email, username }),
      });
      router.push('/users/login'); // 登録後にLoginFormにリダイレクト
    } catch (error: any) {
      console.error(error);
      if (error.code === 'auth/email-already-in-use') {
        setError('このメールアドレスは既に使用されています。');
      } else if (error.code === 'auth/invalid-email') {
        setError('有効なメールアドレスを入力してください。');
      } else if (error.code === 'auth/weak-password') {
        setError('パスワードは6文字以上である必要があります。');
      } else {
        setError('登録中にエラーが発生しました。再度お試しください。');
      }
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="Eploy Logo" className={styles.logoImage} />
        </div>
      </header>
      <h2 className={styles.title}>Sign Up to Eploy</h2>
      <hr className={styles.line} />
      {error && <p className={styles.error}>{error}</p>} {/* エラーメッセージを表示 */}
      <form onSubmit={handleSignUp}>
        <div>
          <label htmlFor="username" className={styles.label}>User Name</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="User Name" className={styles.input} />
        </div>
        <div>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className={styles.input} />
        </div>
        <div>
          <label htmlFor="password" className={styles.label}>Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className={styles.input} />
        </div>
        <button type="submit" className={styles.button}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
