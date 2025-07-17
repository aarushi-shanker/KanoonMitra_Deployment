import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Header from './components/CommonComponents/Header'
import SideBar from './components/CommonComponents/SideBar'
import GlobalRoutes from './components/GlobalRoutes'
import Loader from './pages/Loader'
import './App.css'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/features/userSlice'

function App() {
  const location = useLocation();
  const hideHeaderAndSidebar = location.pathname === '/login' || location.pathname === '/register' || location.pathname.includes('/payment')
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const token= localStorage.getItem("token");

  useEffect(() => {
    try {
      const decodedToken = jwtDecode(token);
      const now = Date.now() / 1000; 

      if (decodedToken.exp < now) { // Token is expired
        window.localStorage.removeItem('token'); 
      }
    } catch (error) {
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const res = await axios.post("/api/v1/user/getUser", {}, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      dispatch(setUser(res.data.data))
    } catch (error) {
    }
  }
  useEffect(() => {
    getUserData();
  }, [token]);

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    )
  } else {
    return (
      <>
        {!hideHeaderAndSidebar && (
          <div className="flex">
            <Header />
            <SideBar />
          </div>
        )}
        <GlobalRoutes fullScreen={hideHeaderAndSidebar} />
      </>
    )
  }
}

export default App