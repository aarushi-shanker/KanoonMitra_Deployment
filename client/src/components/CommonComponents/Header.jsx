import { useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { IoMdNotificationsOutline, IoMdNotifications } from "react-icons/io";
import { useState } from 'react';

const Header = () => {
    const { user } = useSelector(state => state.user);
    const [isOpen, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleNotification = () => {
        setOpen(true);
        navigate('/notification');
    }

    return (
        <div className='w-full border-b-2 border-red-900 lg:border-0 fixed top-0 z-20'>
            <div className="bg-white dark:bg-gray-800 h-16 flex justify-between items-center mx-auto px-4">
                <div className="flex items-center ml-6">
                    <h6 className="text-[2.1rem] font-semibold font-[Alfa Slab One] mx-5 text-red-950" id="loadLogo text-center">
                        Kanoon<span className="samarkand text-amber-600">Mitra</span>
                    </h6>
                </div>
                <div className='flex items-center'>
                    <div className='text-red-900 text-lg m-3 cursor-pointer flex' onClick={handleNotification}>
                        {isOpen ?
                            <IoMdNotifications /> :
                            <IoMdNotificationsOutline />
                        }
                        {user?.notification.length > 0 &&
                            <div className="badge bg-red-900 text-white font-semibold badge-xs dark:bg-gray-700"> {user?.notification.length} </div>
                        }
                        {/*<NavLink to='/notification'>
                    <IoMdNotificationsOutline />
                    <IoMdNotifications />
                    </NavLink>
                    <img src={UserImg} alt='Profile' className='w-[35px] h-[35px] rounded-full' />*/}
                    </div>
                    <div className="hidden md:flex items-center space-x-3 mr-5">
                        <NavLink to='/contact'
                            className={({ isActive, isPending }) =>
                                isActive
                                    ? "text-red-900 p-1.5 active leading-7 font-bold"
                                    : isPending
                                        ? "pending"
                                        : "text-red-950 p-1.5 leading-7 font-semibold hover:text-amber-600"
                            }>
                            Contact Us
                        </NavLink>
                        {user?.username ? (
                            <p className="font-semibold text-amber-700 dark:text-white">{user.username}</p>
                        ) : (
                            <div className="flex items-center relative mr-5">
                                <Link to='/login' className="hover:bg-amber-500 font-semibold text-sm text-red-950 btn shadow-md bg-red-900 border-red-950 text-white dark:bg-gray-700  dark:border-gray-700 dark:hover:bg-gray-600">Sign In</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;