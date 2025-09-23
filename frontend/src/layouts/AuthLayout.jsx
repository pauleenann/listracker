import React from 'react'
import bg from '../assets/images/authBg.jpg'

const AuthLayout = ({children}) => {
  return (
    <div className='h-screen w-screen grid grid-cols-2 overflow-hidden'>
        <div className='w-full h-screen flex justify-center items-center'>{children}</div>
        <div className='h-full w-full'>
            <img src={bg} alt="" className=''/>
        </div>
    </div>
  )
}

export default AuthLayout
