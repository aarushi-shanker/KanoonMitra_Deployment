import React, { useState, useEffect } from 'react'
import axios from 'axios'

const UserList = () => {
  const [users, setUsers] = useState([])

  const getUsers = async () => {
    try {
      const res = await axios.get('/api/v1/admin/getAllUsers', {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          'Cache-Control': 'no-cache'
        }
      });
      if (res.data.success) {
        setUsers(res.data.data)
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleBlockUser = async (userId) => {
    try {
      const res = await axios.put(`/api/v1/admin/block/${userId}`, {}, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        }
      });
      if (res.data.success) {
        getUsers();
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
              Users List
            </h1>
          </div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th className="tracking-wide text-left">Name</th>
                  <th className="tracking-wide text-left">Role</th>
                  <th className="tracking-wide text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users
                  .map((user) => (
                    <tr key={user._id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="font-semibold">{user.username}</div>
                            <div className="text-xs badge badge-ghost badge-sm">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="tracking-wide text-left text-xs">
                        {user.isAdmin === true ? 'Admin' : user.isLawyer === true ? 'Lawyer' : 'User'}
                      </td>
                      {user.isAdmin === true ? '' :
                        <td className='flex justify-start align-center'>
                          <button
                            className={`btn btn-sm font-bold text-xs ${user.isBlocked ? 'btn-neutral' : 'btn-outline'}`}
                            onClick={() => toggleBlockUser(user._id)}
                          >
                            {user.isBlocked ? 'Unblock' : 'Block'}
                          </button>
                        </td>
                      }
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

export default UserList