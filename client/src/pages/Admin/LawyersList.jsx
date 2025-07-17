import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LawyersList = () => {
  const [lawyers, setLawyers] = useState([]);

  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post('/api/v1/admin/changeStatus', { lawyerId: record._id, email: record.email, status: status }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          'Cache-Control': 'no-cache'
        }
      });
      if (res.data.success) {
        getLawyers();
      }
    } catch (error) {
    }
  };

  const getLawyers = async () => {
    try {
      const res = await axios.get('/api/v1/admin/getAllLawyers', {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          'Cache-Control': 'no-cache'
        }
      });
      if (res.data.success) {
        setLawyers(res.data.data);
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    getLawyers();
  }, []);

  return (
    <div className="min-h-screen lg:ms-4 md:pb-4 md:shadow-md bg-base-100">
      <div className="hero-content">
        <div className='w-full'>
          <div className="bg-red-900">
            <h1 className='text-2xl font-bold text-center text-white p-2.5'>
              Lawyers List
            </h1>
          </div>
          <div className="overflow-x-auto px-4 py-2 mt-5">
            <table className="table">
              <thead>
                <tr>
                  <th className="tracking-wide text-left">Name</th>
                  <th className="tracking-wide text-left">Specialization</th>
                  <th className="tracking-wide text-left">Experience (Years)</th>
                  <th className="tracking-wide text-left">Consulation Fees</th>
                  <th className="tracking-wide text-left">Status</th>
                  <th className="tracking-wide text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(lawyers) && lawyers.map((lawyer) => (
                  <tr key={lawyer._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-semibold">{lawyer.firstName} {lawyer.lastName}</div>
                          <div className="text-xs badge badge-ghost badge-sm">{lawyer.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {lawyer.specialization}
                    </td>
                    <td>
                      {lawyer.experience}
                    </td>
                    <td>
                      Rs.{lawyer.feesConsultation}
                    </td>
                    <td className={`tracking-wide text-left ${lawyer.status === 'pending' ? 'text-amber-600' : lawyer.status === 'approved' ? 'text-green-800' : lawyer.status === 'removed'? 'text-white bg-red-300 text-center' : 'text-red-700'} font-semibold text-xs`}>
                      {lawyer.status}
                    </td>
                    <td className='tracking-wide text-left'>
                      {lawyer.status === 'pending' ?
                        <div className='flex gap-3'>
                          <button
                            onClick={() => handleAccountStatus(lawyer, 'approved')}
                            className='btn bg-green-700 text-white hover:bg-green-600 btn-sm font-bold text-xs dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-600'>
                            Approve
                          </button>
                          <button
                            onClick={() => handleAccountStatus(lawyer, 'rejected')}
                            className='btn bg-red-700 text-white hover:bg-red-600 btn-sm font-bold text-xs dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-600'>
                            Reject
                          </button>
                        </div>
                        : lawyer.status === 'approved' ?
                          <button
                            onClick={() => handleAccountStatus(lawyer, 'removed')}
                            className='btn bg-red-700 text-white hover:bg-red-600 btn-sm font-bold text-xs dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-600'>
                            Remove
                          </button>
                          : ''
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyersList;