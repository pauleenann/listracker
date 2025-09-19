import React from 'react'
import AuthLayout from '../layouts/AuthLayout'
import logo from '../assets/images/logo.png'
import InputField from '../components/form/InputField'
import Button from '../components/ui/Button'
import { Link } from 'react-router'
import { useForm } from "react-hook-form"

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  }=useForm();

  const onSubmit = ()=>{
    console.log('Form submitted')
  }

  return (
    <AuthLayout>
      <form 
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col items-center'>
        <img src={logo} alt="Logo" className='w-14'/>
        <h1 className='text-4xl font-semibold mt-12 text-gray-900'>Welcome to Listracker</h1>
        <p className='text-lg text-gray-500 mt-1'>Your simple and reliable online listahan.</p>

        <div className='flex flex-col gap-3 w-full mt-8'>
            <InputField
            id={'email'}
            label={'Email'}
            placeholder={'Enter your email'}
            register={register}
            rules={
              {
                required:'Please enter your email',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                  message: "Please enter a valid email address"
                }
              }
            }
            errors={errors}/>

            <InputField
            id={'password'}
            label={'Password'}
            type={'password'}
            placeholder={'Enter your password'}
            register={register}
            rules={
              {
                required:'Please enter your password'
              }
            }
            errors={errors}/>
        </div>
        
        {/* forgot pass */}
        <div className='w-full text-end mt-2 mb-8'>
            <a href="" className='font-medium text-sm'>Forgot password?</a>
        </div>

        {/* login btn */}
        <Button type={'submit'}>
            Sign in
        </Button>

        {/* sign up */}
        <div className='mt-8'>
            <p className='text-sm font-medium'>
                Don’t have an account?  
                <Link 
                className='text-theme-blue ms-1'>
                    Sign up
                </Link>
            </p>
        </div>
      </form>
    </AuthLayout>
  )
}

export default Login
