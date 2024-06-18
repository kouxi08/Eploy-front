import React, { useState } from 'react';
import Head from 'next/head';
import styles from '../../styles/DeployPage.module.css';
import Header from '../../components/Header';

const DeployPage: React.FC = () => {
  const [showEnvFields, setShowEnvFields] = useState(false);

  const toggleEnvFields = () => {
    setShowEnvFields(!showEnvFields);
  };

  return (
    <div className={styles.pageContainer}>
      <Header />
      <div className={styles.deploy}>
        <Head>
          <title>Create Dockerfile</title>
          <meta name="description" content="Create Dockerfile" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1 className={styles.title}>Create Dockerfile</h1>
        <div className={styles.formContainer}>
          <form>
            <div className={styles.formGroup}>
              <label htmlFor="Run time" className={styles.label}>Run time</label>
              <input type="text" id="Run time" className={styles.input} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="Work dir" className={styles.label}>Work dir</label>
              <input type="text" id="Work dir" className={styles.input} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="Package Manager" className={styles.label}>Package Manager</label>
              <input type="text" id="Package Manager" className={styles.input} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="Start Command" className={styles.label}>Start Command</label>
              <input type="text" id="Start Command" className={styles.input} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="Port" className={styles.label}>Port</label>
              <input type="text" id="Port" className={styles.input} />
            </div>
            <div className={styles.formGroup}>
              <div className={styles.envToggle} onClick={toggleEnvFields}>
                <label className={styles.label}>∨ Environmental Variables</label>
              </div>
              {showEnvFields && (
                <div className={styles.envContainer}>
                  <input type="text" placeholder="Name" className={styles.input}  />
                  <input type="text" placeholder="Value" className={styles.input} />
                  <button type="button" className={`${styles.button} ${styles.addButton}`}>Add</button>
                </div>
              )}
            </div>
            <button type="submit" className={styles.button}>Deploy</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeployPage;
