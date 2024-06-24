import { useRouter } from "next/router"
import {useEffect, useState} from 'react'
import Head from 'next/head';
import styles from '../../styles/DeployPage.module.css';
import Header from '../../components/Header';


export default function GeneratedDockerfile() {
    const router = useRouter();
    const {nodeVersion, packageManager, workDir, port} = router.query;
    const [dockerfile, setDockerfile] = useState('');



    const handleSubmit = async () => {
        const response = await fetch('../api/generate-dockerfile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nodeVersion, packageManager, workDir, port }),
        });
    
        const data = await response.json();
        setDockerfile(data.textData);
    };
   

    useEffect(() => {
        handleSubmit();
    }, [nodeVersion, packageManager, workDir, port]);
   

    const handleDownload = () => {
        const blob = new Blob([dockerfile], {type:"application/octet-stream"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Dockerfile';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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

                    {dockerfile && (
                        <div>
                        <pre>{dockerfile}</pre>
                        <button onClick={handleDownload} className={styles.button}>Download Dockerfile</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}