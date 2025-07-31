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
        fetchData();
    }, []);

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
            setStats(statsRes.data);
            console.log(statsRes.data);
            setLogs(logsRes.data);
            console.log(logsRes.data);
            setWeeklyAnalyticsData(weeklyAnalyticsRes.data);
            console.log(weeklyAnalyticsRes.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen lg:ms-4 md:pb-4 md:shadow-md bg-base-100">
            <div className="hero-content flex flex-col">
                <div className="bg-red-900 w-full">
                    <h1 className='text-2xl font-bold text-center text-white p-2.5'>
                        Admin Dashboard
                    </h1>
                </div>
                <div className="px-4 py-2 lg:w-full overflow-x-auto mt-5 gap-5 flex flex-col">
                    <SummaryCards stats={stats} />
                    <ActivityChart data={weeklyAnalyticsData} />
                    <LogTable logs={logs} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;