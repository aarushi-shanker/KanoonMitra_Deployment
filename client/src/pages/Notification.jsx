import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import emptyNotification from '../assets/empty_notifications.png'

const Notification = () => {
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('unread');

  const handleMarkAllRead = async () => {

    try {
      const res = await axios.post('/api/v1/user/get-all-notification', { userId: user.uid }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      });
      if (res.data.success) {
        window.location.reload();
      } else {
      }
    } catch (error) {
    }
  }

  const handleDeleteAll = async () => {
    try {
      const res = await axios.post('/api/v1/user/delete-all-notification', { userId: user.uid }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      });
      if (res.data.success) {
        window.location.reload();
      } else {
      }
    } catch (error) {
    }
  }

  return (
    <div className="min-h-screen lg:ms-4 md:pb-4 md:shadow-md bg-base-100">
      <div className="hero-content">
        <div className='w-full'>
          <div className="bg-red-900">
            <h1 className='text-2xl font-bold text-center text-white p-2.5'>
              Notifications
            </h1>
          </div>
          <div role="tablist" className="tabs tabs-bordered mt-5">
            <input
              type="radio"
              name="tab"
              id="unread-tab"
              role="tab"
              className="tab"
              aria-label="UNREAD"
              checked={activeTab === 'unread'}
              onChange={() => setActiveTab('unread')}
            />
            <label htmlFor="unread-tab" className="tab-label"></label>

            <input
              type="radio"
              name="tab"
              id="read-tab"
              role="tab"
              className="tab"
              aria-label="READ"
              checked={activeTab === 'read'}
              onChange={() => setActiveTab('read')}
            />
            <label htmlFor="read-tab" className="tab-label"></label>

            <div
              role="tabpanel"
              className={`tab-content p-4 ${activeTab === 'unread' ? 'block' : 'hidden'}`}
            >
              {user?.notification.length > 0 ?
                <>
                  <div className='flex justify-end'>
                    <button
                      onClick={handleMarkAllRead}
                      className="btn btn-sm shadow-md bg-red-900 hover:bg-red-900 border-red-950 cursor-pointer text-white dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-600">
                      Mark All as Read
                    </button>
                  </div>
                  <div className="overflow-x-auto px-4 py-2">
                    <table className="table">
                      <tbody>
                        {user?.notification.map((notificationMsgs, index) => (
                          <tr key={index}>
                            <td onClick={() => navigate(notificationMsgs.onClickPath)} className='cursor-pointer'>
                              <div className='text-sm'>
                                {notificationMsgs.message}.
                              </div>
                            </td>
                          </tr>
                        ))
                        }
                      </tbody>
                    </table>
                  </div>
                </> :
                <div className='flex flex-col justify-center items-center gap-2'>
                  <img src={emptyNotification} alt='' className='md:h-[40%] md:w-[40%] mt-4' />
                  <p className='text-center'>You are caught up with everything.</p>
                </div>
              }
            </div>
            <div
              role="tabpanel"
              className={`tab-content p-4 ${activeTab === 'read' ? 'block' : 'hidden'}`}
            >
              {user?.seenNotification.length > 0 ?
                <>
                  <div className='flex justify-end'>
                    <button
                      onClick={handleDeleteAll}
                      className="btn btn-sm shadow-md bg-red-900 hover:bg-red-900 border-red-950 cursor-pointer text-white dark:bg-gray-700 dark:border-gray-700 dark:hover:bg-gray-600">
                      Delete All
                    </button>
                  </div>
                  <div className="overflow-x-auto px-4 py-2">
                    <table className="table">
                      <tbody>
                        {user?.seenNotification.map((notificationMsgs, index) => (
                          <tr key={index}>
                            <td onClick={() => navigate(notificationMsgs.onClickPath)} className='cursor-pointer'>
                              <div className='text-sm'>
                                {notificationMsgs.message}.
                              </div>
                            </td>
                          </tr>
                        ))
                        }
                      </tbody>
                    </table>
                  </div>
                </> :
                <div className='flex flex-col justify-center items-center gap-2'>
                  <img src={emptyNotification} alt='' className='md:h-[40%] md:w-[40%] mt-4' />
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notification