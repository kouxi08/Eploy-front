import styles from '../components/ApplicationCard.module.css';
import NextLink from 'next/link';
import { Link as IconLink } from './Link'; // Use a different name for the icon
import Github from './Github';

const ApplicationCard = ({ id, name, url, status, link, github }) => {
  const statusClasses = {
    Running: styles.running,
    ContainerCreating: styles.containercreating,
    Pending: styles.containercreating,
    Error: styles.error,
    Unknown: styles.unknown,
  };

  const statusIcons = {
    Running: '/icons/Runningicon.png',
    ContainerCreating: '/icons/ContainerCreatingIcon.png',
    Pending: '/icons/ContainerCreatingIcon.png',
    Error: '/icons/ErrorIcon.png',
    Unknown: '/icons/UnknownIcon.png',
  };

  return (
    // <NextLink href={`/applications/${id}`} passHref>
      <div className={`${styles.card} ${statusClasses[status]}`}>
        <div className={styles.statusIconContainer}>
          <img src={statusIcons[status]} alt={`${status} icon`} className={styles.statusIcon} />
          <p className={styles.cardTitle}>{name}</p>
        </div>
        <p className={styles.carddomain}>{url}</p>
        <div className={styles.iconsContainer}>
          <a href={`http://${link}`} target="_blank" rel="noopener noreferrer" className={styles.icon}>
            <IconLink />
          </a>
          <a href={github} target="_blank" rel="noopener noreferrer" className={styles.icon}>
            <Github />
          </a>
        </div>
      </div>
    // </NextLink>
  );
};

export default ApplicationCard;
