import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import emptyState from '../assets/empty_state.png';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const { user } = useSelector(state => state.user);
    const currentDate = new Date();

    const parseTimeTo24HourFormat = (time) => {
        const [timePart, modifier] = time.split(' ');
        let [hours, minutes] = timePart.split(':').map(Number);

        if (modifier === 'PM' && hours !== 12) {
            hours += 12;
        } else if (modifier === 'AM' && hours === 12) {
            hours = 0;
        }

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    };

    const getUserAppointments = async () => {
        try {
            const res = await axios.get('/api/v1/user/appointments', {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            if (res.data.success) {
                setAppointments(res.data.data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const getLawyerAppointments = async () => {
        try {
            const res = await axios.get('/api/v1/lawyer/appointments', {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            if (res.data.success) {
                setAppointments(res.data.data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleStatus = async (record, status) => {
        try {
            const res = await axios.post('/api/v1/lawyer/update-appointment-status', { appointmentId: record._id, status: status }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                    'Cache-Control': 'no-cache'
                }
            });
            if (res.data.success) {
                getLawyerAppointments();
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (user?.isLawyer) {
            getLawyerAppointments();
        } else {
            getUserAppointments();
        }
    }, [user?.isLawyer])

    return (
        <div className="min-h-screen lg:ms-4 md:pb-4 md:shadow-md bg-base-100">
            <div className="hero-content flex flex-col">
                <div className="bg-red-900 w-full">
                    <h1 className='text-2xl font-bold text-center text-white p-2.5'>
                        Appointments
                    </h1>
                </div>
                <div className="px-4 py-2 lg:w-full overflow-x-auto mt-5">
                    {appointments.length > 0 ?
                        <table className="table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th className='tracking width text-left'>{user.isLawyer ? "Client's Name" : "Lawyer's Name"}</th>
                                    <th className='tracking width text-left'>Email</th>
                                    <th className='tracking width text-left'>Appointment Date</th>
                                    <th className='tracking width text-left'>Appointment Time</th>
                                    <th className='tracking width text-left'>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map((appointment, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{user.isLawyer ? appointment.username : `${appointment.lawyerFname} ${appointment.lawyerLname}`}</td>
                                        <td>{user.isLawyer ? appointment.userEmail : appointment.lawyerEmail}</td>
                                        <td>
                                            {new Date(appointment.date).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: '2-digit',
                                            })}
                                        </td>
                                        <td>
                                            {appointment.time}
                                        </td>
                                        <td className={`${currentDate > new Date(`${appointment.date}T${parseTimeTo24HourFormat(appointment.time)}`) ? 'text-gray-800' : appointment.status === 'pending' ? 'text-amber-600' : appointment.status === 'approved' ? 'text-green-800' : 'text-red-700'} font-semibold text-sm`}>
                                            {currentDate > new Date(`${appointment.date}T${parseTimeTo24HourFormat(appointment.time)}`) ? 'Appointment Time Passed' :
                                                appointment.status}
                                        </td>
                                        { !(user.isLawyer || appointment.status === 'pending') && 
                                        <td>
                                            <p className='text-xs font-semibold'>
                                                {(appointment.status === 'rejected' || (appointment.status === 'pending' && currentDate > new Date(`${appointment.date}T${parseTimeTo24HourFormat(appointment.time)}`))) ?
                                                    'Money Refunded' : 'Refund Not Applicable'}                                             
                                            </p>
                                        </td>
                                        }
                                        <td>{user.isLawyer && appointment.status === 'pending' ? (
                                            <div className='flex gap-1'>
                                                <button
                                                    onClick={() => handleStatus(appointment, 'approved')}
                                                    className='hover:bg-green-600 font-semibold text-sm text-white btn btn-sm shadow-md bg-green-800 border-green-800 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-600'>
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleStatus(appointment, 'rejected')}
                                                    className='hover:bg-red-700 font-semibold text-sm text-white btn btn-sm shadow-md bg-red-600 border-red-600 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-600'>
                                                    Reject
                                                </button>
                                            </div>
                                        ) : ''}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        :
                        <div className='text-center w-full'>
                            {!user.isLawyer ? <div className='flex flex-col justify-center items-center'>
                                <img src={emptyState} alt='' />
                                <p className='text-center'>You have not booked any appointments till now</p>
                            </div> :
                                <div className='flex flex-col justify-center items-center'>
                                    <img src={emptyState} alt='' />
                                    <p className='text-center'>No appointments</p>
                                </div>}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Appointments;