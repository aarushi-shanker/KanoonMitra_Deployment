import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LawyerApply = () => {
  const { user } = useSelector(state => state.user);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    specialization: '',
    experience: '',
    feesConsultation: '',
    website: '',
    start: '09:00',
    end: '17:00',
    profilePhoto: null
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/v1/lawyer/apply-lawyer', {
        ...formData,
        userId: user._id,
        timings: { start: formData.start, end: formData.end }
      }, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      });
      if (res.data.success) {
        navigate('/');
      }
    } catch (error) {
      setError(error.message || 'Failed to register lawyer.');
    }
  };

  return (
    <div className="min-h-screen lg:ms-4 md:pb-4 md:shadow-md bg-base-100">
      <div className="hero-content">
        <div className='w-full'>
          <form className="" onSubmit={handleSubmit}>
            <div className="bg-red-900">
              <h1 className='md:text-2xl font-bold text-center text-white p-2.5'>
                Are you a lawyer?<br />Apply Here to Register as a lawyer at Kanoon Mitra.
              </h1>
            </div>
            <p className='my-4 text-center text-gray-700 font-semibold'>Fill in the form below and wait for your interview call from us. Our team will contact you withing 1-2 weeks of Form Submission.</p>
            {[
              { label: 'First Name', name: 'firstName', type: 'text' },
              { label: 'Last Name', name: 'lastName', type: 'text' },
              { label: 'Phone', name: 'phone', type: 'tel', pattern: '[0-9]{10}' },
              { label: 'Email', name: 'email', type: 'email' },
              { label: 'Address', name: 'address', type: 'text' },
              { label: 'Specialization', name: 'specialization', type: 'text' },
              { label: 'Experience (Years)', name: 'experience', type: 'text' },
              { label: 'Consultation Fees (Rs.)', name: 'feesConsultation', type: 'text' },
              { label: 'Website', name: 'website', type: 'text' },
            ].map((field, index) => (
              <div className="form-control mt-5" key={index}>
                <label className="label">
                  <span className="label-text text-red-900 font-semibold">{field.label}</span>
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.label}
                  className="input input-bordered focus:border-red-950 dark:focus:border-gray-700"
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.name !== 'website'}
                />
              </div>
            ))}
            <div className="form-control mt-5">
              <label className="label">
                <span className="label-text text-red-900 font-semibold">Profile Photo</span>
              </label>
              <input
                type="file"
                name="profilePhoto"
                accept="image/*"
                className="input input-bordered focus:border-red-950 dark:focus:border-gray-700"
                onChange={handleChange}
              />
            </div>
            <div className="form-control mt-5">
              <label className="label">
                <span className="label-text text-red-900 font-semibold">Timing</span>
              </label>
              <div className='flex flex-row gap-3'>
                <div className="relative">
                  <input type="time"
                    name="start"
                    value={formData.start}
                    onChange={handleChange}
                    className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-900 focus:border-red-900 block w-50 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-900 dark:focus:border-red-900"
                    min="09:00" max="18:00" required />
                  <label className="block ml-2 mt-2 text-sm font-medium text-red-900 dark:text-white">(Start time)</label>
                </div>
                <span className='text-center text-gray-600 mt-2'>to</span>
                <div className="relative">
                  <input type="time"
                    name="end"
                    value={formData.end}
                    onChange={handleChange}
                    className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-900 focus:border-red-900 block w-50 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-900 dark:focus:border-red-900"
                    min="09:00" max="18:00" required />
                  <label className="block ml-2 mt-2 text-sm font-medium text-red-900 dark:text-white">(End time)</label>
                </div>
              </div>
            </div>
            <div className='mt-3'>
              <p className="text-center font-semibold text-red-500 text-xs">{error}</p>
              <div className="form-control mt-2 flex flex-row gap-3 justify-center">
                <button type="button" className="btn shadow-md hover:bg-red-600 border-red-600 cursor-pointer text-red-600 hover:text-white dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-600">
                  Cancel
                </button>
                <button type="submit" className="btn shadow-md bg-red-900 hover:bg-red-700 border-red-900 cursor-pointer text-white dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-600">
                  Apply
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LawyerApply;