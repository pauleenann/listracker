import React from 'react'
import InputField from '../../../components/form/InputField';
import Button from '../../../components/ui/Button';
import { useForm } from "react-hook-form"

const SignupForm = () => {
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
    <form
    onSubmit={handleSubmit(onSubmit)}
    className='flex flex-col gap-3 w-full mb-8'>
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
      
        <div className='mt-3'>
            <Button type={'submit'}>
                Sign up
            </Button>
        </div>
        
    </form>
  )
}

export default SignupForm
