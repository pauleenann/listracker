import React from 'react'
import AuthLayout from '../layouts/AuthLayout'
import logo from '../assets/images/logo.png'
import { Link } from 'react-router'
import LoginForm from '../features/authentication/components/LoginForm'


const Login = () => {
  return (
    <AuthLayout>
      <div 
      className='flex flex-col items-center w-[50%]'>
        <img src={logo} alt="Logo" className='w-10'/>
        
        <header className='my-8 text-center w-full'>
          <h1 className='text-4xl font-semibold text-gray-900'>Welcome to Listracker</h1>
          <p className='text-lg text-gray-500 mt-1'>Your store's simple and reliable online listahan.</p>  
        </header>

        <LoginForm/>        
      
        <footer className='mt-8'>
            <p className='text-sm font-medium'>
                Don’t have an account?  
                <Link 
                to={'/signup'}
                className='text-theme-blue ms-1'>
                    Sign up
                </Link>
            </p>
        </footer>
      </div>
    </AuthLayout>
  )
}

export default Login
