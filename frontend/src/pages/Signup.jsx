import React from 'react'
import AuthLayout from '../layouts/AuthLayout'
import logo from '../assets/images/logo.png'
import InputField from '../components/form/InputField'
import Button from '../components/ui/Button'
import { Link } from 'react-router'
import { useForm } from "react-hook-form"

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
    watch
  }=useForm();

  const onSubmit = ()=>{
    console.log('Form submitted')
  }

  const password = watch("password");

  return (
    <AuthLayout>
      <form 
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col items-center w-[50%] overflow-y-auto'>
        <img src={logo} alt="Logo" className='w-10'/>

        <header className='my-8 text-center w-full'>
            <h1 className='text-4xl font-semibold text-gray-900'>Create your account</h1>
            <p className='text-lg text-gray-500 mt-1'>Join now and start managing your store’s listahan with ease.</p>    
        </header>
        
        <div className='flex flex-col gap-3 w-full'>
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
                required:'Please enter your password',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                },
                pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: "Password must include uppercase, lowercase, number, and special character"
                }
              }
            }
            errors={errors}/>

            <InputField
            id={'confirmPassword'}
            label={'Confirm Password'}
            type={'password'}
            placeholder={'Re-enter your password'}
            register={register}
            rules={
              {
                required:'Please confirm your password',
                validate: value=>
                    value===password||"Password do not match"
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
        <footer className='mt-8'>
            <p className='text-sm font-medium'>
                Already have an account?  
                <Link 
                to={'/'}
                className='text-theme-blue ms-1'>
                    Sign in
                </Link>
            </p>
        </footer>
      </form>
    </AuthLayout>
  )
}

export default Signup
