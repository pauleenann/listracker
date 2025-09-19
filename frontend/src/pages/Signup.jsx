import React from 'react'
import AuthLayout from '../layouts/AuthLayout'
import logo from '../assets/images/logo.png'
import { Link } from 'react-router'
import SignupForm from '../features/authentication/components/SignupForm'

const Signup = () => {
  return (
    <AuthLayout>
      <div
      className='flex flex-col items-center w-[50%] overflow-y-auto'>
        <img src={logo} alt="Logo" className='w-10'/>

        <header className='my-8 text-center w-full'>
            <h1 className='text-4xl font-semibold text-gray-900'>Create your account</h1>
            <p className='text-lg text-gray-500 mt-1'>Join now and start managing your store’s listahan with ease.</p>    
        </header>
        
        <SignupForm/>

        <footer>
            <p className='text-sm font-medium'>
                Already have an account?  
                <Link 
                to={'/'}
                className='text-theme-blue ms-1'>
                    Sign in
                </Link>
            </p>
        </footer>
      </div>
    </AuthLayout>
  )
}

export default Signup
