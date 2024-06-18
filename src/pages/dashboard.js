import Head from 'next/head';
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
        // ローカルストレージからトークンを取得
        const token = localStorage.getItem('token');
        
        const response = await fetch('/api/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        
        // データが配列であることを確認
        if (Array.isArray(data)) {
          setApplications(data);
          setFilteredApplications(data);
        } else {
          console.error('Expected array but got:', data);
        }
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
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard Application" />
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
          {Array.isArray(filteredApplications) && filteredApplications.map((app, index) => (
            <ApplicationCard 
              key={index} 
              id={app.id} // assuming each application has a unique `id`
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
