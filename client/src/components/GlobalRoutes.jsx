import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Dashboard from '../pages/Admin/Dashboard'
import LoginForm from '../pages/LoginForm'
import RegisterForm from '../pages/Register'
import ProtectedRoutes from './ProtectedRoutes'
import Profile from '../pages/Profile'
import LawyerApply from '../pages/Lawyers/LawyerApply'
import Lawyers from '../pages/Lawyers/Lawyers'
import LawyersDetails from '../pages/Lawyers/LawyersDetails'
import Contact from '../pages/Contact'
import Notification from '../pages/Notification'
import LawyersList from '../pages/Admin/LawyersList'
import UserList from '../pages/Admin/UserList'
import Appointments from '../pages/Appointments'
import Assistant from './Assistant'
import LegalFormats from '../pages/LegalFormats/LegalFormats'
import DocumentPage from '../pages/LegalFormats/DocumentPage'
import DocumentInput from '../pages/LegalFormats/DocumentInput'
import PaymentSuccess from '../pages/Payments/PaymentSuccess'
import PaymentCancel from '../pages/Payments/PaymentCancel'
import { useSelector } from 'react-redux'

function GlobalRoutes({ fullScreen }) {
  const { user } = useSelector(state => state.user);
  return (
    <div>
      <main className={`${fullScreen ? '' : 'pt-16 lg:ps-60'} text-sm min-h-screen`}>
        <Routes>
          <Route
            path="/"
            element={user?.isAdmin ? <Home /> : <Dashboard />}
          />

          <Route path="/Assistant" element={
            <Assistant />
          } />
          <Route path="/legalFormats" element={
            <LegalFormats />
          } />
          <Route path="/documentInput/:name" element={
            <DocumentInput />
          } />
          <Route path="/documentPage/:name" element={
            <DocumentPage />
          } />
          <Route path="/login" element={
            <LoginForm />
          } />
          <Route path="/contact" element={
            <Contact />
          } />
          <Route path="/lawyerList" element={
            <LawyersList />
          } />
          <Route path="/userList" element={
            <UserList />
          } />
          <Route path="/lawyers" element={
            <Lawyers />
          } />
          <Route path="/lawyers/:id" element={
            <ProtectedRoutes>
              <LawyersDetails />
            </ProtectedRoutes>
          } />

          <Route path="/lawyer-appointment/payment/success" element={<PaymentSuccess />} />
          <Route path="/lawyer-appointment/payment/cancel" element={<PaymentCancel />} />

          <Route path="/lawyerApply" element={
            <ProtectedRoutes>
              <LawyerApply />
            </ProtectedRoutes>
          } />
          <Route path="/Appointments-Page" element={
            <ProtectedRoutes>
              <Appointments />
            </ProtectedRoutes>
          } />
          <Route path="/notification" element={
            <ProtectedRoutes>
              <Notification />
            </ProtectedRoutes>
          } />
          <Route path="/register" element={
            <RegisterForm />
          } />
          <Route path="/profile" element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          } />
        </Routes>
      </main>
    </div>
  )
}

export default GlobalRoutes