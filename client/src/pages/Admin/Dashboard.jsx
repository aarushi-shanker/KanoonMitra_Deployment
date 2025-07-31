import React, { useEffect, useState } from "react";
import axios from "axios";
import SummaryCards from "../../components/AdminDashboard/SummaryCards.jsx";
import LogTable from "../../components/AdminDashboard/LogTable.jsx";
import ActivityChart from "../../components/AdminDashboard/ActivityChart.jsx";

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [logs, setLogs] = useState([]);
    const [weeklyAnalyticsData, setWeeklyAnalyticsData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const statsRes = await axios.get('/api/v1/admin/stats', {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                        'Cache-Control': 'no-cache'
                    }
                });
                const logsRes = await axios.get('/api/v1/admin/logs', {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                        'Cache-Control': 'no-cache'
                    }
                });
                const weeklyAnalyticsRes = await axios.get('/api/v1/admin/analytics', {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                        'Cache-Control': 'no-cache'
                    }
                });
                if (statsRes.data.success) {
                    setStats(statsRes.data);
                }
                if (logsRes.data.success) {
                    setLogs(logsRes.data);
                }
                if (logsRes.data.success) {
                    setWeeklyAnalyticsData(weeklyAnalyticsRes.data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);


    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold text-white">Kanoon Mitra Admin Dashboard</h1>
            <SummaryCards stats={stats} />
            <ActivityChart data={weeklyAnalyticsData} />
            <LogTable logs={logs} />
        </div>
    );
};

export default Dashboard;