import Head from 'next/head';
import path from 'path';
import fs from 'fs/promises';
import { useState, useEffect } from 'react';
import styles from '../styles/Dashboard.module.css';
import Header from '../components/Header';
import ApplicationCard from '../components/ApplicationCard';

const Dashboard = ({ applications }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredApplications, setFilteredApplications] = useState(applications);

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
          {filteredApplications.map((app, index) => (
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

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public', 'application.json');
  const jsonData = await fs.readFile(filePath, 'utf8');
  const data = JSON.parse(jsonData);

  return {
    props: {
      applications: data.sites,
    },
  };
}

export default Dashboard;
