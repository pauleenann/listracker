import React from 'react'
import InputField from '../../../components/form/InputField';
import Button from '../../../components/ui/Button';
import { useForm } from "react-hook-form"
import { signin } from '../services';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router';

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    }=useForm();
    const {signIn} = useAuth();
    const navigate = useNavigate();
    
    const onSubmit = async (data)=>{
        try {
            const response = await signin(data.email, data.password);
            const authInfo = response.data;
            console.log(response)

            if(authInfo){
                signIn(authInfo.user, authInfo.accessToken)
                navigate('/dashboard')
            }
        } catch (error) {
            console.error('Cannot sign in: ', error)
        }
    }

    return (
        <form 
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-3 w-full'>
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
                    }
                }
            }
            errors={errors}/>

            {/* forgot pass */}
            <div className='w-full text-end mt-2 mb-3'>
                <a href="" className='font-medium text-sm'>Forgot password?</a>
            </div>

            {/* login btn */}
            <Button type={'submit'}>
                Sign in
            </Button>
        </form>
    )
}

export default LoginForm
