import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../../styles/DeployPage.module.css';
import Header from '../../components/Header';

const DeployPage: React.FC = () => {
  const [showEnvFields, setShowEnvFields] = useState(false);
  const [applications, setApplications] = useState([]);
  const [envFields, setEnvFields] = useState([{ id: 0, name: '', value: '' }]);
  const [gitUrl, setgitUrl] = useState('')
  const [appName, setappName] = useState('')
  const [port, setPort] = useState('');
  const [dockerDir, setdockerDir] = useState('')
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const filteredEnvFields = envFields.filter(env => env.name !== '' && env.value !== '');
      const response = await fetch('/api/deploy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({gitUrl, appName, port, dockerDir, envFields: filteredEnvFields}),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const addEnvField = () => {
    const nextId = envFields.length > 0 ? envFields[envFields.length - 1].id + 1 : 0;
    setEnvFields([...envFields, { id: nextId, name: '', value: '' }]);
  };

  const toggleEnvFields = () => {
    setShowEnvFields(!showEnvFields);
  };

  const deleteEnvField = (id: number) => {
    const updatedEnvFields = envFields.filter((env) => env.id !== id);
    setEnvFields(updatedEnvFields);
  };

  const handleEnvFieldChange = (id: number, fieldName: 'name' | 'value', value: string) => {
    const newEnvFields = [...envFields];
    const index = newEnvFields.findIndex((env) => env.id === id);
    if (index !== -1) {
      newEnvFields[index][fieldName] = value;
      setEnvFields(newEnvFields);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    // Simulate a delay for loading screen demo
    setTimeout(() => {
      setLoading(false);
      router.push('/next-page'); // Example next page route
    }, 2000); // 2 seconds delay
  };

  return (
    <div className={styles.pageContainer}>
      <Header />
      <div className={styles.deploy}>
        <Head>
          <title>Deploy</title>
          <meta name="description" content="Deploy Application" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1 className={styles.title}>Deploy</h1>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            {/* git URL */}
            <div className={styles.formGroup}>
              <label htmlFor="gitRepoUrl" className={styles.label}>Git repository URL</label>
              <input type="text" id="gitRepoUrl" onChange={(e)=> setgitUrl(e.target.value)} className={styles.input} required/>
            </div>
            {/* app Name */}
            <div className={styles.formGroup}>
              <label htmlFor="appName" className={styles.label}>Application Name</label>
              <input type="text" id="appName" onChange={(e)=> setappName(e.target.value)} className={styles.input} required/>
            </div>
            {/* port */}
            <div className={styles.formGroup}>
              <label htmlFor="port" className={styles.label}>Port</label>
              <input type="text" id="port" onChange={(e)=> setPort(e.target.value)} className={styles.input} required/>
            </div>
            {/* docker Dir */}
            <div className={styles.formGroup}>
              <label htmlFor="dockerfileDir" className={styles.label}>Dockerfile dir</label>
              <input type="text" id="dockerfileDir" onChange={(e)=> setdockerDir(e.target.value)}  className={styles.input} required/>
            </div>
            {/* Env */}
            <div className={styles.formGroup}>
              <div className={styles.envToggle} onClick={toggleEnvFields}>
                <img
                  src={showEnvFields ? '/state_toggle.png' : '/toggle.png'} 
                  alt="toggle icon"
                  className={styles.icon}
                />
                <label className={styles.label}>Environmental Variables</label>
              </div>
              <div className={styles.envFieldsContainer} style={{ maxHeight: showEnvFields ? '100px' : '0' }}>
                {showEnvFields &&
                  envFields.map((env, index) => (
                    <div key={index} className={styles.envContainer}>
                      <input type="text" placeholder="Name" className={styles.input} value={env.name} onChange={(e) => handleEnvFieldChange(env.id, 'name', e.target.value)} />
                      <input type="text" placeholder="Value" className={styles.input} value={env.value} onChange={(e) => handleEnvFieldChange(env.id, 'value', e.target.value)} />
                      {index === envFields.length - 1 ? (
                        <button type="button" className={`${styles.button} ${styles.addButton}`} onClick={addEnvField}>
                          Add
                        </button>
                      ) : (
                        <button type="button" className={`${styles.button} ${styles.addButton}`} onClick={() => deleteEnvField(env.id)}>
                          Del
                        </button>
                      )}
                    </div>
                  ))}
              </div>
            </div>
            <button type="submit" className={styles.button}>Create</button>
          </form>
        </div>
        {loading && (
          <div className={styles.loadingOverlay}>
            <div className={styles.loadingSpinner}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeployPage;
