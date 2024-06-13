import { useState } from 'react';
import styles from './Header.module.css'; // Updated path
import { IconamoonProfileCircleFill } from './profile';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Header = () => {
  const [isBubbleVisible, setBubbleVisible] = useState(false);
  const router = useRouter();

  const toggleBubble = () => {
    setBubbleVisible(!isBubbleVisible);
  };

  const handleAccountSetting = () => {
    router.push('/AccountSetting'); 
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logging out...');
  };

  return (
    <header className={styles.header}>
      <div className={styles.row}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="Logo" />
        </div>
        <div className={styles.profile} onClick={toggleBubble}>
          <IconamoonProfileCircleFill />
          {isBubbleVisible && (
            <div className={styles.bubble}>
              <div className={styles.bubbleItem} onClick={handleAccountSetting}>Account Setting</div>
              <div className={styles.bubbleDivider}></div>
              <div className={`${styles.bubbleItem} ${styles.logout}`} onClick={handleLogout}>Log Out</div>
            </div>
          )}
        </div>
      </div>

      <nav className={styles.nav}>
        <Link href="/Dashboard">Dashboard</Link>
        <Link href="#">Deploy</Link>
        <Link href="#">Document</Link>
      </nav>
    </header>
  );
};

export default Header;
