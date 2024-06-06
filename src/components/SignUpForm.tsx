// components/SignUpForm.tsx
import React from 'react';
import styles from './SignUpForm.module.css';

const SignUpForm: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="Eploy Logo" className={styles.logoImage} />
        </div>
      </header>
      <h2 className={styles.title}>Sign Up to Eploy</h2>
      <hr className={styles.line} />
      <form>
        <div>
          <label htmlFor="username" className={styles.label}>User Name</label>
          <input type="text" id="username" placeholder="User Name" className={styles.input} />
        </div>
        <div>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input type="email" id="email" placeholder="Email" className={styles.input} />
        </div>
        <div>
          <label htmlFor="password" className={styles.label}>Password</label>
          <input type="password" id="password" placeholder="Password" className={styles.input} />
        </div>
        <button type="submit" className={styles.button}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
