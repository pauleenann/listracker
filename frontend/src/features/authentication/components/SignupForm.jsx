import React from 'react'
import InputField from '../../../components/form/InputField';
import Button from '../../../components/ui/Button';
import { useForm } from "react-hook-form"
import { signup } from '../services';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router';

const SignupForm = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        watch
    }=useForm();
    const {signIn} = useAuth();
    const navigate = useNavigate();
    
    const onSubmit = async (data)=>{
        try {
            const response = await signup(data.firstname, data.lastname, data.email, data.password);
            const authInfo = response.data;
            console.log(response)

            if(authInfo){
                signIn(authInfo.user, authInfo.accessToken)
                navigate('/dashboard')
            }
        } catch (error) {
           console.error("Signup failed", error); 
        }
    }
    
    const password = watch("password");

  return (
    <form
    onSubmit={handleSubmit(onSubmit)}
    className='flex flex-col gap-3 w-full mb-8'>
        <InputField
        id={'firstname'}
        label={'First name'}
        placeholder={'Enter your first name'}
        register={register}
        rules={
            {
                required:'Please enter your first name',
              }
        }
        errors={errors}/>

        <InputField
        id={'lastname'}
        label={'Last name'}
        placeholder={'Enter your last name'}
        register={register}
        rules={
            {
                required:'Please enter your last name',
              }
        }
        errors={errors}/>

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
