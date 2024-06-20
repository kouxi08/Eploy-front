import { useState, useEffect } from 'react';
import styles from '../styles/Dashboard.module.css';
import Header from '../components/Header';
import ApplicationCard from '../components/ApplicationCard';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await fetch('/api/dashboardapi', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data = await response.json();
        setApplications(data);
        setFilteredApplications(data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications();
  }, []);

  useEffect(() => {
    const filterApps = () => {
      setFilteredApplications(
        applications.filter(app =>
          app.application_name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    };
    filterApps();
  }, [searchTerm, applications]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={styles.mainContainer}>
      <Header />
      <div className={styles.dashboard}>
        <div className={styles.search}>
          <input
            type="text"
            placeholder="search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className={styles.cards}>
          {filteredApplications.map((app, index) => (
            <ApplicationCard
              key={index}
              id={app.id} // assuming each application has a unique id
              name={app.application_name}
              url={app.domain}
              status={app.status}
              link={app.domain}
              github={app.github_url}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
