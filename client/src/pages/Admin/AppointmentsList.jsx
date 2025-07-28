import React, { useState, useEffect } from 'react'
import axios from 'axios'

const AppointmentsList = () => {
    const [appointments, setAppointments] = useState([])

    const getUsers = async () => {
        try {
            const res = await axios.get('/api/v1/admin/getAllAppointments', {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                    'Cache-Control': 'no-cache'
                }
            });
            if (res.data.success) {
                setAppointments(res.data.data)
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getUsers();
    }, [])

    return (
        <div className="min-h-screen lg:ms-4 md:pb-4 md:shadow-md bg-base-100">
            <div className="hero-content">
                <div className='w-full'>
                    <div className="bg-red-900">
                        <h1 className='text-2xl font-bold text-center text-white p-2.5'>
                            Appointments List
                        </h1>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2">User Email</th>
                                    <th className="px-4 py-2">Lawyer Name</th>
                                    <th className="px-4 py-2">Lawyer Email</th>
                                    <th className="px-4 py-2">Date</th>
                                    <th className="px-4 py-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map((appt) => (
                                    <tr key={appt._id} className="border-t">
                                        <td className="px-4 py-2">{appt.userEmail || "N/A"}</td>
                                        <td className="px-4 py-2">{appt.lawyerFname || "N/A"} {appt.lawyerLname || "N/A"}</td>
                                        <td className="px-4 py-2">{appt.lawyerEmail || "N/A"}</td>
                                        <td className="px-4 py-2">{new Date(appt.date).toLocaleString()}</td>
                                        <td className="px-4 py-2">{appt.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppointmentsList