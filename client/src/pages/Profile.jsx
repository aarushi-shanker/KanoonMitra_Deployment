import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { getImagePath } from '../../../utils/getImagePath'

const Profile = () => {
  const { user } = useSelector(state => state.user);
  const [lawyer, setLawyer] = useState({});
  const [previewPhoto, setPreviewPhoto] = useState('');

  const getLawyerInfo = async () => {
    try {
      const res = await axios.post('/api/v1/lawyer/getLawyerInfo',
        { userId: user._id },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
      if (res.data.success) {
        setLawyer(res.data.data);
      }
    } catch (error) {
    }
  }
  useEffect(() => {
    getLawyerInfo();
  }, [])

  const [msg, setMsg] = useState('');
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (lawyer) {
      setFormData({
        firstName: lawyer.firstName || '',
        lastName: lawyer.lastName || '',
        phone: lawyer.phone || '',
        email: lawyer.email || '',
        address: lawyer.address || '',
        specialization: lawyer.specialization || '',
        experience: lawyer.experience || '',
        feesConsultation: lawyer.feesConsultation || '',
        website: lawyer.website || '',
        start: lawyer.timings?.start || '',
        end: lawyer.timings?.end || '',
        profilePhoto: lawyer.profilePhoto,
      });
      setPreviewPhoto(getImagePath(lawyer.profilePhoto));
    }
  }, [lawyer])

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profilePhoto') {
      const file = files[0];
      if (file) {
        setPreviewPhoto(URL.createObjectURL(file)); // Preview new image
        setFormData(prevData => ({
          ...prevData,
          profilePhoto: file // Update only profilePhoto if new file is selected
        }));
      }
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/v1/lawyer/updateProfile', {
        ...formData,
        userId: lawyer.userId,
        timings: { start: formData.start, end: formData.end }
      }, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      });
      if (res.data.success) {
        setMsg('Profile updated successfully');
        getLawyerInfo();
      } else {
        setMsg('Failed to update profile.');
      }
      setTimeout(() => {
        setMsg('')
      }, 1000)
    } catch (error) {
      console.error('Error updating profile:', error);
      setMsg(error.message || 'Failed to update profile.');
    }
  };


  return (
    <div className="min-h-screen lg:ms-4 md:pb-4 md:shadow-md bg-base-100">
      <div className="hero-content">
        <div className='w-full'>
          <form className="" onSubmit={handleSubmit}>
            <div className="bg-red-900">
              <h1 className='text-2xl font-bold text-center text-white p-2.5'>
                Manage your Profile
              </h1>
            </div>
            {lawyer && [
              { label: 'First Name', name: 'firstName', type: 'text' },
              { label: 'Last Name', name: 'lastName', type: 'text' },
              { label: 'Phone', name: 'phone', type: 'tel', pattern: '[0-9]{10}' },
              { label: 'Email', name: 'email', type: 'email' },
              { label: 'Address', name: 'address', type: 'text' },
              { label: 'Specialization', name: 'specialization', type: 'text' },
              { label: 'Experience', name: 'experience', type: 'text' },
              { label: 'Consultation Fees', name: 'feesConsultation', type: 'text' },
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
            {formData.profilePhoto &&
              <div className="form-control mt-5">
                <label className="label">
                  <span className="label-text text-red-900 font-semibold">Current Profile Photo</span>
                </label>
                <img
                  src={previewPhoto}
                  alt="Profile"
                  style={{ width: '200px', height: '200px' }}
                />
              </div>
            }
            <div className="form-control mt-5">
              <label className="label">
                <span className="label-text text-red-900 font-semibold">Change Profile Photo</span>
              </label>
              <input
                type="file"
                name="profilePhoto"
                accept="image/*"
                className="input focus:border-red-950 dark:focus:border-gray-700"
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
              <p className={`text-center font-semibold text-xs ${msg === 'Profile updated successfully' ? 'text-green-600' : 'text-red-500' }`}>{msg}</p>
              <div className="form-control mt-2 flex flex-row gap-3 justify-center">
                <button type="button" className="btn shadow-md hover:bg-red-600 border-red-600 cursor-pointer text-red-600 hover:text-white dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-600">
                  Cancel
                </button>
                <button type="submit" className="btn shadow-md bg-red-900 hover:bg-red-700 border-red-900 cursor-pointer text-white dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-600">
                  Edit Profile
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile