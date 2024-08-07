import React, { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import styles from '../styles/AccountSetting.module.css';

const AccountSetting = ({ defaultUsername, defaultEmail }) => {
    const [username, setUsername] = useState(defaultUsername);
    const [email, setEmail] = useState(defaultEmail);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSaveUsername = () => {
        // ユーザー名保存ロジック
    };

    const handleSaveEmail = () => {
        // メール保存ロジック
    };

    const handleDeleteAccount = () => {
        // アカウント削除ロジック
    };

    return (
        <div className={styles.mainContainer}>
            <Head>
                <title>Account Setting</title>
                <meta name="description" content="Account Setting Page" />
                <link rel="icon" href="/favicon.ico" />
                <style>{`
          html, body {
            height: 100%;
            margin: 0;
            background-color: #FAFAFA;
          }
        `}</style>
            </Head>
            <Header />
            <div className={styles.contentContainer}>
                <h1 className={styles.title}>Account Setting</h1>
                <hr className={styles.divider} />
                <div className={styles.settings}>
                    <div className={styles.settingSection}>
                        <h2>Username</h2>
                        <p>This is your URL namespace within Eploy.</p>
                        <div className={styles.settingRow}>
                            <input
                                type="text"
                                value={username}
                                placeholder="Test User"
                                onChange={handleUsernameChange}
                                className={styles.input}
                            />
                            <button
                                onClick={handleSaveUsername}
                                className={styles.button}
                            >
                                Save
                            </button>
                        </div>
                    </div>

                    <hr className={styles.divider} />

                    <div className={styles.settingSection}>
                        <h2>Email</h2>
                        <p>
                            Enter the email addresses you want to use to log in
                            with Eploy.
                        </p>
                        <div className={styles.settingRow}>
                            <input
                                type="email"
                                value={email}
                                placeholder="hogehoge@gmail.com"
                                onChange={handleEmailChange}
                                className={styles.input}
                            />
                            <button
                                onClick={handleSaveEmail}
                                className={styles.button}
                            >
                                Save
                            </button>
                        </div>
                    </div>

                    <hr className={styles.divider} />

                    <div className={styles.settingSection1}>
                        <h2 className={styles.deleteTitle}>Delete Account</h2>
                        <p className={styles.deleteTitle}>
                            Permanently remove your Personal Account and all of
                            its contents from the Eploy platform. This action is
                            not reversible, so please continue with caution.
                        </p>
                        <div className={styles.buttonContainer}>
                            <button
                                onClick={handleDeleteAccount}
                                className={styles.deleteButton}
                            >
                                Delete Personal Account
                            </button>
                        </div>
                    </div>

                    <hr className={styles.divider} />
                </div>
            </div>
        </div>
    );
};

export default AccountSetting;
