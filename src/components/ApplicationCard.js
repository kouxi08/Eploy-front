import styles from '../components/ApplicationCard.module.css'; 
import { Link } from './Link'; 
import Github from './Github'; 

const ApplicationCard = ({ name, url, status, link, github }) => {
  const statusClasses = {
    running: styles.running,
    ContainerCreating: styles.containercreating,
    Error: styles.error,
    Unknown: styles.unknown,
  };

  const statusIcons = {
    running: '/icons/Runningicon.png',
    ContainerCreating: '/icons/ContainerCreatingicon.png',
    Error: '/icons/ErrorIcon.png',
    Unknown: '/icons/UnknownIcon.png',
  };

  return (
    <div className={`${styles.card} ${statusClasses[status]}`}>
      <div className={styles.statusIconContainer}>
        <img src={statusIcons[status]} alt={`${status} icon`} className={styles.statusIcon} />
        <p className={styles.cardTitle}>{name}</p>
      </div>
      <p className={styles.carddomain}>{url}</p>
      <div className={styles.iconsContainer}>
        <a href={link} target="_blank" rel="noopener noreferrer" className={styles.icon}>
          <Link /> 
        </a>
        <a href={github} target="_blank" rel="noopener noreferrer" className={styles.icon}>
          <Github />
        </a>
      </div>
    </div>
  );
};

export default ApplicationCard;
