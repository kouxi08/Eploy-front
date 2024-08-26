import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Dashboard.module.css';
import Header from '../components/Header';
import ApplicationCard from '../components/ApplicationCard';

const Dashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [applications, setApplications] = useState([]);
    const [filteredApplications, setFilteredApplications] = useState([]);
    const [appStatus, setAppStatus] = useState({});
    const router = useRouter();

    useEffect(() => {
        const updateAppStatus = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }
            try {
                const statusUpdates = await Promise.all(
                    filteredApplications.map(async (app) => {
                        const deployment = app.deployment_name;
                        const response = await fetch(
                            `/api/app-status/${deployment}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            },
                        );

                        if (!response.ok) {
                            throw new Error(
                                `Error fetching data: ${response.statusText}`,
                            );
                        }
                        const data = await response.json();
                        return { id: app.id, status: data.status };
                    }),
                );

                const statusMap = statusUpdates.reduce(
                    (acc, { id, status }) => {
                        acc[id] = status;
                        return acc;
                    },
                    {},
                );

                setAppStatus((prevStatus) => ({ ...prevStatus, ...statusMap }));
            } catch (error) {
                console.error('Error fetching applications:', error);
            }
        };
        const intervalId = setInterval(updateAppStatus, 20000);

        return () => clearInterval(intervalId);
    }, [filteredApplications]);

    useEffect(() => {
        const fetchApplications = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }
            try {
                const response = await fetch('/api/dashboardapi', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(
                        `Error fetching data: ${response.statusText}`,
                    );
                }

                const data = await response.json();
                console.log(data);
                setApplications(data.projects);
                setFilteredApplications(data.projects);
            } catch (error) {
                console.error('Error fetching applications:', error);
            }
        };

        fetchApplications();
    }, []);

    useEffect(() => {
        const filterApps = () => {
            setFilteredApplications(
                applications.filter((app) =>
                    app.name.toLowerCase().includes(searchTerm.toLowerCase()),
                ),
            );
        };
        filterApps();
    }, [searchTerm, applications]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCardClick = (app) => {
        router.push({
            pathname: '/applicationDetailPage',
            query: { id: app.id },
        });
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
                        <div key={index} onClick={() => handleCardClick(app)}>
                            <ApplicationCard
                                key={index}
                                id={app.id} // assuming each application has a unique id
                                name={app.name}
                                url={app.domain}
                                status={appStatus[app.id] || app.status}
                                link={app.domain}
                                github={app.git_repo_url}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
