import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { getImagePath } from '../../../../utils/getImagePath';

const Lawyers = () => {
  const [lawyers, setLawyers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const getLawyers = async () => {
    try {
      const res = await axios.get('/api/v1/user/getLawyers', {});
      if (res.data.success) {
        setLawyers(res.data.data);
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    if (search.length === 4 || search === '')
      getLawyers();
  }, [search]);

  // Search functionality code
  const filteredLawyers = lawyers.filter((lawyer) => {
    const matchesSearch = lawyer.specialization.toLowerCase().includes(search.toLowerCase()) || lawyer.address.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen lg:ms-4 md:pb-4 md:shadow-md bg-base-100">
      <div className="hero-content flex flex-col">
        <div className="bg-red-900 w-full">
          <h1 className='text-2xl font-bold text-center text-white p-2.5'>
            Find your Lawyer
          </h1>
        </div>
        <div className='w-full px-8'>
          <label className="input flex items-center gap-2 input-sm sm:w-auto border-amber-700 dark:border-gray-700">
            <input
              type="text"
              className="grow w-full"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search lawyer by name"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
        <div className="px-4 py-2 lg:w-full">
          <table className="table">
            <tbody>
              {filteredLawyers
                .map((lawyer) => (
                  <tr key={lawyer._id} className='flex-1 lg:flex-none'>
                    <td>
                      <div className="card lg:card-side bg-base-100 shadow-xl border-red-900 border w-full">
                        <figure>
                          <img
                            src={getImagePath(lawyer.profilePhoto)}
                            alt="Album"
                            className='w-[330px] h-[330px]'
                          />
                        </figure>
                        <div className="card-body w-5/6">
                          <h2 className="card-title">{lawyer.firstName} {lawyer.lastName}</h2>
                          <table className='table-xs'>
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
                                <td><strong>Timings:</strong></td>
                                <td>{lawyer.timings.start} - {lawyer.timings.end}</td>
                              </tr>
                              <tr>
                                <td><strong>Phone:</strong></td>
                                <td>{lawyer.phone}</td>
                              </tr>
                              <tr>
                                <td><strong>Email:</strong></td>
                                <td>{lawyer.email}</td>
                              </tr>
                              {lawyer.website == '' ? '' :
                                <tr>
                                  <td><strong>Website:</strong></td>
                                  <td>{lawyer.website}</td>
                                </tr>
                              }
                              <tr>
                                <td><strong>Address:</strong></td>
                                <td>{lawyer.address}</td>
                              </tr>
                            </tbody>
                          </table>
                          <div className="card-actions justify-end">
                            <button 
                            onClick={()=> navigate(`/lawyers/${lawyer._id}`)}
                            className="hover:bg-yellow-500 font-semibold text-sm text-red-900 btn shadow-md bg-base-100 border-red-900 dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-600">Book Appointment</button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Lawyers