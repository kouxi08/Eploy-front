import { useRouter } from 'next/router';
import React from 'react';
import { useState, useEffect } from 'react';
import styles from '../styles/ApplicationDetailPage.module.css';
import Header from '../components/Header';
import { Line } from 'react-chartjs-2';
import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import Link from 'next/link';
import { ApplicationDetail } from '../types/ApplicationDetail';

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

const ApplicationDetailPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [applicationDetail, setApplicationDetail] =
        useState<ApplicationDetail | null>(null);

    // 詳細情報の取得
    useEffect(() => {
        const fetchApplicationDetail = async () => {
            if (!id) return;
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`/api/application-detail/${id}`,{
                    headers: {
                      'Authorization': `Bearer ${token}`
                    }
                  });
                if (!response.ok) {
                    throw new Error(
                        `Error fetching data: ${response.statusText}`,
                    );
                }
                const data: ApplicationDetail = await response.json();
                setApplicationDetail(data);
            } catch (error) {
                console.error('Error fetching application details:', error);
            }
        };
        fetchApplicationDetail();
    }, [id]);

    if (!applicationDetail) {
        return <div>Loading...</div>;
    }

    //削除ボタン処理
    const deleteApplication = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }

            const response = await fetch(`/api/delete-application/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to deploy: ' + response.statusText);
            }
            const data = await response.json();
            router.push('/dashboard');
        } catch (error) {
            console.error('Error fetching applications:', error);
        }
    };

    //グラフ描画変数
    const data = {
        labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
        ],
        datasets: [
            {
                label: 'Access Log',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className={styles.pageContainer}>
            <Header />
            <div className={styles.detailContainer}>
                <Link href="/dashboard" className={styles.link}>
                    Dashboard/
                </Link>
                <h1 className={styles.title}>
                    {applicationDetail.name}
                </h1>
                <div className={styles.infoContainer}>
                    <div className={styles.infoRow}>
                        <span className={styles.label}>Git Hub URL</span>
                        <span className={styles.value}>
                            <a
                                href={applicationDetail.git_repo_url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {applicationDetail.git_repo_url}
                            </a>
                        </span>
                    </div>
                    <hr className={styles.divider} />
                    <div className={styles.infoRow}>
                        <span className={styles.label}>Created At</span>
                        <span className={styles.value}>
                            {new Date(
                                applicationDetail.created_at,
                            ).toLocaleString()}
                        </span>
                    </div>
                    <hr className={styles.divider} />
                    <div className={styles.infoRow}>
                        <span className={styles.label}>Domain</span>
                        <span className={styles.value}>
                            <a href={applicationDetail.domain} target="_blank" rel="noopener noreferrer">
                                {applicationDetail.domain}
                            </a>
                        </span>
                    </div>
                    <hr className={styles.divider} />
                </div>
                <div className={styles.accessLogContainer}>
                    <span className={styles.label}>Access Log</span>
                    <div className={styles.graph}>
                        <Line data={data} options={options} />
                    </div>
                </div>
                <button onClick={deleteApplication} className={styles.deleteButton}>
                    Delete Application
                </button>
            </div>
        </div>
    );
};

export default ApplicationDetailPage;
