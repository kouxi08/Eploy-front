import React from 'react';
import styles from './LoginForm.module.css';


const LoginForm: React.FC = () => {
  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.logo}>
            <img src="/images/logo.png" alt="Eploy Logo" className={styles.logoImage} />
          </div>
        </header>
        <h2 className={styles.title}>Login to Eploy</h2>
        <hr className={styles.line} />
        <form>
          <div>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input type="email" id="email" placeholder="Email" className={styles.input} />
          </div>
          <div>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input type="password" id="password" placeholder="Password" className={styles.input} />
          </div>
          <button type="submit" className={styles.button}>Login</button>
        </form>
      </div>
      <div className={styles.extraContainer}>
        <button type="button" className={styles.createAccountButton}>
          Create an account
        </button>
        <hr className={styles.line} />
        <div className={styles.otherLoginMethods}>
          <div className={styles.otherLoginButton}>
            <img src="/images/github.png" alt="GitHub" />
            Sign in with GitHub
          </div>
          <div className={styles.otherLoginButton}>
            <img src="/images/google.png" alt="Google" />
            Sign in with Google
          </div>
          <div className={styles.otherLoginButton}>
            <img src="/images/x.png" alt="X" />
            Sign in with X
          </div>
        </div>
      </div>
    </>
  );
};


export default LoginForm;