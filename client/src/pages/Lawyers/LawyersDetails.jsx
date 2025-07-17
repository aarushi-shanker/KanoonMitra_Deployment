import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getImagePath } from '../../../../utils/getImagePath';
import { useSelector } from 'react-redux';

const LawyersDetails = () => {
  const { user } = useSelector(state => state.user);
  const [lawyer, setLawyer] = useState([]);
  const params = useParams();
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [isAvailable, setAvailable] = useState(false);
  const [checkmsg, setCheckMsg] = useState('');
  const [bookingmsg, setBookingMsg] = useState('');
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  const startDate = today.toISOString().split('T')[0];

  const checkAvailability = async () => {
    setBookingMsg('');
    try {
      const res = await axios.post('/api/v1/user/booking-availability',
        {
          lawyerId: params.id,
          date: appointmentDate,
          time: appointmentTime,
        }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setCheckMsg(res.data.message);
        setAvailable(true);
      } else {
        setCheckMsg(res.data.message);
        setAvailable(false);
      }
    } catch (error) {
    }
  };

  const handleBooking = async () => {
    setCheckMsg('');
    try {
      const res = await axios.post('/api/v1/user/book-appointment',
        {
          lawyerId: params.id,
          userInfo: user,
          lawyerInfo: lawyer,
          date: appointmentDate,
          time: appointmentTime,
        }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      setBookingMsg("Could not book your Appointment! please try again later.");
    }
  };

  const getLawyerInfo = async () => {
    try {
      const res = await axios.post('/api/v1/lawyer/getLawyerById',
        { lawyerId: params.id },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
      if (res.data.success) {
        setLawyer(res.data.data);
      }
    } catch (error) {
    }
  };

  const generateTimeSlots = (startTime, endTime, interval) => {
    const slots = [];
    let currentTime = new Date(startTime);

    while (currentTime <= new Date(endTime)) {
      const hours = currentTime.getHours();
      if (hours !== 13) { // Exclude 1-2 PM
        slots.push(currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
      }
      currentTime = new Date(currentTime.getTime() + interval * 60000); // Add interval minutes
    }
    return slots;
  };

  const start = lawyer.timings?.start ? new Date(`1970-01-01T${lawyer.timings.start}:00`) : null;
  const end = lawyer.timings?.end ? new Date(`1970-01-01T${lawyer.timings.end}:00`) : null;
  const timeSlots = start && end ? generateTimeSlots(start, end, 45) : [];

  useEffect(() => {
    getLawyerInfo();
  }, []);

  return (
    <div className="min-h-screen lg:ms-4 md:pb-4 md:shadow-md bg-base-100">
      <div className="hero-content flex flex-col">
        <div className="bg-red-900 w-full">
          <h1 className='text-2xl font-bold text-center text-white p-2.5'>
            Book your Appointment
          </h1>
        </div>
        <div className="card lg:card-side bg-base-100 w-full flex-1 items-center lg:flex-none">
          <figure>
            <img
              src={getImagePath(lawyer.profilePhoto)}
              alt="Album"
              className='w-[330px] h-[330px] p-6'
            />
          </figure>
          <div className="card-body mt-8 mb-4">
            <h2 className="card-title">{lawyer.firstName} {lawyer.lastName}</h2>
            <table className='table-xs lg:table-sm'>
              <tbody>
                <tr>
                  <td><strong>Specialization:</strong></td>
                  <td>{lawyer.specialization}</td>
                </tr>
                <tr>
                  <td><strong>Experience:</strong></td>
                  <td>{lawyer.experience} years</td>
                </tr>
                <tr>
                  <td><strong>Fees for Consultation:</strong></td>
                  <td> Rs. {lawyer.feesConsultation}</td>
                </tr>
                <tr>
                  <td><strong>Phone:</strong></td>
                  <td>{lawyer.phone}</td>
                </tr>
                <tr>
                  <td><strong>Email:</strong></td>
                  <td>{lawyer.email}</td>
                </tr>
                {lawyer.website === '' ? '' :
                  <tr>
                    <td><strong>Website:</strong></td>
                    <td>{lawyer.website}</td>
                  </tr>
                }
                <tr>
                  <td><strong>Address:</strong></td>
                  <td>{lawyer.address}</td>
                </tr>
                <tr>
                  <td><strong>Timings:</strong></td>
                  <td>
                    {new Date(`1970-01-01T${lawyer.timings?.start}:00`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })} -
                    {new Date(`1970-01-01T${lawyer.timings?.end}:00`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className='flex md:flex-row flex-col justify-center items-center gap-2 w-full'>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Pick a date</span>
            </label>
            <input type="date" placeholder="Pick a Date"
              min={startDate} value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              className="input input-bordered w-full max-w-xs" />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Pick a time</span>
            </label>
            <select className="select select-bordered"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}>
              <option>Pick a Time</option>
              {timeSlots.map((time, i) => (
                <option key={i} value={time}>{time}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col items-center w-80 gap-2">
          <button className="w-full shrink-0 hover:bg-amber-500 font-semibold text-xs text-red-950 btn shadow-md bg-red-900 border-red-950 text-white dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-600 px-2 py-1 text-xs"
            onClick={checkAvailability}>
            Check Availability
          </button>
          <p className={`${checkmsg == 'Appointment Available' ? 'text-green-800' : 'text-red-700'}`}>{checkmsg}</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <button className={`mt-2 hover:bg-yellow-500 font-semibold text-sm text-red-900 btn shadow-md bg-base-100 border-red-900 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-600 ${isAvailable ? '' : 'hidden'}`}
            onClick={handleBooking}>
            Book Appointment
          </button>
          <p className='text-red-500'>{bookingmsg}</p>
        </div>
      </div>
    </div>
  );
};

export default LawyersDetails;