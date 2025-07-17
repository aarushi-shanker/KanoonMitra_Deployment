import React from 'react'
import FailImg from '../../assets/payment-fail.png'

const PaymentCancel = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <div className="flex flex-col items-center px-4 gap-4">
        <img src={FailImg} alt='' className='h-80 object-cover mt-[5%]' />
        <div className='text-red-700 font-semibold text-center md:text-lg'>Payment Unsuccessful. <br />Could not apply for Appointment. Please try again later.</div>
      </div>
    </div>
  )
}

export default PaymentCancel