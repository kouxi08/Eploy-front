import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../../styles/create.module.css';
import Header from '../../components/Header';

const DeployPage: React.FC = () => {
  const [showEnvFields, setShowEnvFields] = useState(false);
  const [envFields, setEnvFields] = useState([{ id: 0, name: '', value: '' }]);
  const [nodeVersion, setNodeVersion] = useState('latest');
  const [packageManager, setPackageManager] = useState('npm');
  const [workDir, setWorkDir] = useState('');
  const [port, setPort] = useState('');
  const router = useRouter();
  
  const handleSubmit = (event: any) => {
    const workDirValue = workDir.trim() || '/app';
    event.preventDefault();

    router.push({
      pathname: '/create/generated-dockerfile',
      query: { nodeVersion, packageManager, workDir: workDirValue, port },
    });
  };

  const toggleEnvFields = () => {
    setShowEnvFields(!showEnvFields);
  };

  const deleteEnvField = (id: number) => {
    const updatedEnvFields = envFields.filter((env) => env.id !== id);
    setEnvFields(updatedEnvFields);
  };

  const addEnvField = () => {
    const nextId = envFields.length > 0 ? envFields[envFields.length - 1].id + 1 : 0;
    setEnvFields([...envFields, { id: nextId, name: '', value: '' }]);
  };

  const handleEnvFieldChange = (id: number, fieldName: 'name' | 'value', value: string) => {
    const newEnvFields = [...envFields];
    const index = newEnvFields.findIndex((env) => env.id === id);
    if (index !== -1) {
      newEnvFields[index][fieldName] = value;
      setEnvFields(newEnvFields);
    }
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
          <form onSubmit={handleSubmit}>
            {/* Node Version */}
            <div className={styles.formGroup}>
              <label htmlFor="Node Version" className={styles.label}>Node Version</label>
              <div className={styles.pulldown}>
              <select value={nodeVersion} onChange={(e) => setNodeVersion(e.target.value)} required  >
                <option value="latest">latest</option>  
                <option value="22.3">22.3</option>
                <option value="22">22</option>
                <option value="22-slim">22-slim</option>
                <option value="20">20</option>
                <option value="20-slim">20-slim</option>
              </select>
              </div>
            </div>
            {/* Package Manager */}
            <div className={styles.formGroup}>
              <label htmlFor="Package Manager" className={styles.label}>Package Manager</label>
              <select value={packageManager} onChange={(e) => setPackageManager(e.target.value)} required className={styles.input} >
                <option value="npm">npm</option>  
                <option value="pnpm">pnpm</option>
                <option value="yarn">yarn</option>
                <option value="bun">bun</option>
              </select>
            </div>
            {/* Work Dir */}
            <div className={styles.formGroup}>
              <label htmlFor="Work dir" className={styles.label}>Work Dir</label>
              <input value={workDir} placeholder="/app" onChange={(e) => setWorkDir(e.target.value)} className={styles.input} />
            </div>
            {/* Port */}
            <div className={styles.formGroup}>
              <label htmlFor="Port" className={styles.label}>Port</label>
              <input value={port} onChange={(e) => setPort(e.target.value)} required className={styles.input} />
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
      </div>
    </div>
  );
};

export default DeployPage;
