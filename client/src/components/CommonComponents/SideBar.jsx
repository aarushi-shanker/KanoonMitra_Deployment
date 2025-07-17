import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';

function SideBar() {
  const { user } = useSelector(state => state.user);
  const navigate= useNavigate();


  const handleClick = (name) => {
    if(name == 'LogOut') {
      localStorage.clear();
      navigate('/login');
    }
  };

  return (
    <div className="lg:drawer-open fixed top-16  shadow-sm z-20 lg:z-0">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex items-start justify-start">
        <label htmlFor="my-drawer-2" className="m-5 bg-base-100 rounded-md p-2 drawer-button lg:hidden absolute cursor-pointer text-red-950 top-[-65px] z-40"><GiHamburgerMenu /></label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay "></label>
        <ul className="w-64 text-red-950 bg-base-100 min-h-full text-base-content font-semibold  pt-15 md:pt-2 space-y-9">
          <li className='ml-5'>
            <h6 className="text-[1.65rem] text-red-950 font-[Alfa Slab One] mx-5 p-5 lg:hidden" id="loadLogo text-center">
              Kanoon<span className="samarkand text-amber-600">Mitra</span></h6>
          </li>
          {user?.username ?
            <li className='md:hidden ml-5'>
              <div className="flex items-center text-amber-700 px-2">
                <Link to='/' onClick={() => handleClick('Home')} className='flex flex-row items-center gap-2 justify-center'>
                  <figure >
                    
                  </figure>
                  <span className={`font-semibold dark:text-white`}>{user.username}</span>
                </Link>
              </div>
            </li>
            :
            <li className='md:hidden text-xl mx-5 hover:bg-amber-400 py-1.5'>
              <Link to='/login' onClick={() => handleClick('Sign In')}
                className="hover:bg-amber-500 font-semibold text-sm text-red-950 btn shadow-md bg-red-900 border-red-950 text-white dark:bg-gray-700  dark:border-gray-700 dark:hover:bg-gray-600">
                <span className={`ml-2 inline`}>Sign In</span>
              </Link>
            </li>
          }
          <li className='text-xl mx-5'>
            <NavLink
              to='/'
              className={({ isActive, isPending }) =>
                isActive
                  ? "bg-red-900 p-1.5 text-white active block"
                  : isPending
                    ? "pending"
                    : "hover:bg-amber-400 p-1.5 block"
              }
              onClick={() => handleClick('Home')}
            >
              <span className={`ml-2 inline`}>Home</span>
            </NavLink>
          </li>
          <li className='text-xl mx-5'>
            <NavLink
              to='/legalFormats'
              className={({ isActive, isPending }) =>
                isActive
                  ? "bg-red-900 p-1.5 text-white active block"
                  : isPending
                    ? "pending"
                    : "hover:bg-amber-400 p-1.5 block"
              }
              onClick={() => handleClick('Home')}
            >
              <span className={`ml-2 inline`}>Legal Formats</span>
            </NavLink>
          </li>
          <li className='text-xl mx-5'>
              <NavLink
                to='/Appointments-Page'
                onClick={() => handleClick('Appointments Page')}
                className={({ isActive, isPending }) =>
                  isActive
                    ? "bg-red-900 p-1.5 text-white active block"
                    : isPending
                      ? "pending"
                      : "hover:bg-amber-400 p-1.5 block"
                }
              >
                <span className={`ml-2 inline`}>Appointments</span>
              </NavLink>
          </li>
          <li className='text-xl mx-5'>
            <NavLink
              to='/lawyers'
              onClick={() => handleClick('Lawyers')}
              className={({ isActive, isPending }) =>
                isActive
                  ? "bg-red-900 p-1.5 text-white active block"
                  : isPending
                    ? "pending"
                    : "hover:bg-amber-400 p-1.5 block"
              }
            >
              <span className={`ml-2 inline`}>Find Your Lawyer</span>
            </NavLink>
          </li>
          <li className='text-xl mx-5'>
            {user?.isAdmin ?
              <NavLink
                to='/lawyerList'
                onClick={() => handleClick('LawyerList')}
                className={({ isActive, isPending }) =>
                  isActive
                    ? "bg-red-900 p-1.5 text-white active block"
                    : isPending
                      ? "pending"
                      : "hover:bg-amber-400 p-1.5 block"
                }
              >
                <span className={`ml-2 inline`}>Lawyers List</span>
              </NavLink>
              :
              user?.isLawyer ?
                <NavLink
                  to='/profile'
                  onClick={() => handleClick('Profile')}
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "bg-red-900 p-1.5 text-white active block"
                      : isPending
                        ? "pending"
                        : "hover:bg-amber-400 p-1.5 block"
                  }
                >
                  <span className={`ml-2 inline`}>Manage Profile</span>
                </NavLink>
                :        
              <NavLink
                to='/lawyerApply'
                onClick={() => handleClick('Lawyer')}
                className={({ isActive, isPending }) =>
                  isActive
                    ? "bg-red-900 p-1.5 text-white active block"
                    : isPending
                      ? "pending"
                      : "hover:bg-amber-400 p-1.5 block"
                }
              >
                <span className={`ml-2 inline`}>Register as Lawyer</span>
              </NavLink>
            }
          </li>
          <li className='text-xl mx-5'>
            {user?.isAdmin &&
              <NavLink
                to='/userList'
                onClick={() => handleClick('UserList')}
                className={({ isActive, isPending }) =>
                  isActive
                    ? "bg-red-900 p-1.5 text-white active block"
                    : isPending
                      ? "pending"
                      : "hover:bg-amber-400 p-1.5 block"
                }
              >
                <span className={`ml-2 inline`}>User List</span>
              </NavLink>
            }
          </li>
          <li className='text-xl mx-5'>
            <NavLink
              to='/Assistant'
              className={({ isActive, isPending }) =>
                isActive
                  ? "bg-red-900 p-1.5 text-white active block"
                  : isPending
                    ? "pending"
                    : "hover:bg-amber-400 p-1.5 block"
              }
              onClick={() => handleClick('Support')}
            >
              <span className={`ml-2 inline`}>Find Support</span>
            </NavLink>
          </li>
          <li className='text-xl md:hidden mx-5'>
            <NavLink
              to='/contact'
              className={({ isActive, isPending }) =>
                isActive
                  ? "bg-red-900 p-1.5 text-white active block"
                  : isPending
                    ? "pending"
                    : "hover:bg-amber-400 p-1.5 block"
              }
            >
              <span className={`ml-2 inline`}>Contact Us</span>
            </NavLink>
          </li>
          <li className={`text-xl mx-5 ${user?.username ? '' : 'hidden'}`}>
            <NavLink
              to='/login'
              onClick={() => handleClick('LogOut')}
              className={({ isActive, isPending }) =>
                isActive
                  ? "bg-red-900 p-1.5 text-white active block"
                  : isPending
                    ? "pending"
                    : "hover:bg-amber-400 p-1.5 block"
              }
            >
              <span className={`ml-2 inline`}>Log Out</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default SideBar;

{/* <img src={UserImg} alt='Profile' className='w-[25px] h-[25px] rounded-full' /> */}