import React from 'react'
import InputField from '../../../components/form/InputField'
import { useForm } from 'react-hook-form'
import DefaultButton from '../../../components/ui/DefaultButton';
import Button from '../../../components/ui/Button';

const DebtorForm = ({close}) => {
    const {
        register,
        handleSubmit,
        formState: {errors}
    }=useForm();

    const addDebtor = (data)=>{
        console.log(data)
    }

  return (
    <form 
    onSubmit={handleSubmit(addDebtor)}
    className='flex flex-col gap-2 mt-5'>
        <InputField
        id={'name'}
        label={'Debtor name'}
        placeholder={'Enter debtor name'}
        register={register}
        rules={
            {
                required: 'Please enter debtor name'
            }
        }
        errors={errors}/>
      
        <InputField
        id={'contactNumber'}
        label={'Contact number'}
        placeholder={'Enter contact number'}
        register={register}
        rules={
            {
                required: 'Please enter contact number',
                pattern: {
                    value: /^09\d{11}$/,  
                    message: 'Contact number must start with 09 and be 11 digits'
                }
            }
        }
        errors={errors}/>

        <footer className='flex items-center justify-end gap-2 mt-5'>
            <div>
                <DefaultButton
                onClick={close}>
                    Cancel
                </DefaultButton>
            </div>
            <div>
                <Button
                type='submit'>
                    Save
                </Button>    
            </div>
        </footer>
    </form>
  )
}

export default DebtorForm
