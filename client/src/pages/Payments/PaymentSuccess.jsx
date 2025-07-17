import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SuccessIcon from '../../assets/payment-success.png';

const PaymentSuccess = () => {
  const location = useLocation();
  const sessionId = new URLSearchParams(location.search).get('session_id');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isConfirmed = useRef(false);

  useEffect(() => {
    if (sessionId && !isConfirmed.current) {
      confirmBooking();
      isConfirmed.current = true;
    }
  }, [sessionId]);

  const confirmBooking = async () => {
    try {
      const res = await axios.post('/api/v1/user/confirm-booking', { sessionId }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      if (res.data.success) {
        setTimeout(() => {
          navigate('/Appointments-Page');
        }, 2000);    
      } else {
        navigate('/lawyer-appointment/payment/cancel');
      }
    } catch (error) {
      navigate('/lawyer-appointment/payment/cancel');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <div className="flex flex-col items-center px-4">
        <img src={SuccessIcon} alt='Payment Success' className={`h-80 object-cover mt-[5%] ${loading ? 'animate-pulse' : '' } `} />
        <div className='text-green-800 font-semibold text-center lg:text-lg'>
          {loading ? 'Processing your booking...' : 'Your appointment request has been sent to your lawyer. You will receive a notification once it is confirmed.' }
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;