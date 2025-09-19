import React from 'react'
import bg from '../assets/images/authBg.jpg'

const AuthLayout = ({children}) => {
  return (
    <div className='w-screen h-screen grid grid-cols-2 overflow-hidden'>
        <div className='flex justify-center items-center'>{children}</div>
        <div className=''>
            <img src={bg} alt="" />
        </div>
    </div>
  )
}

export default AuthLayout
