import React from 'react';
import styles from '../../styles/DeployPage.module.css';

const DeployPage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="Eploy Logo" className={styles.logoImage} />
        </div>
      </header>
      <nav className={styles.navbar}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <a href="#" className={styles.navLink}>Dashboard</a>
          </li>
          <li className={styles.navItem}>
            <a href="#" className={styles.navLink}>Deploy</a>
          </li>
          <li className={styles.navItem}>
            <a href="#" className={styles.navLink}>Document</a>
          </li>
        </ul>
      </nav>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Deploy</h2>
        <form>
          <div className={styles.formGroup}>
            <label htmlFor="gitRepoUrl" className={styles.label}>Git repository URL</label>
            <input type="text" id="gitRepoUrl" className={styles.input} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="appName" className={styles.label}>Application Name</label>
            <input type="text" id="appName" className={styles.input} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="port" className={styles.label}>Port</label>
            <input type="text" id="port" className={styles.input} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="dockerfileDir" className={styles.label}>Dockerfile dir</label>
            <input type="text" id="dockerfileDir" className={styles.input} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Environmental Variables</label>
            <input type="text" placeholder="Name" className={styles.input} style={{ marginBottom: '10px' }} />
            <input type="text" placeholder="Value" className={styles.input} />
            <button type="button" className={`${styles.button} ${styles.addButton}`}>Add</button>
          </div>
          <button type="submit" className={styles.button}>Deploy</button>
        </form>
      </div>
    </div>
  );
};

export default DeployPage;
