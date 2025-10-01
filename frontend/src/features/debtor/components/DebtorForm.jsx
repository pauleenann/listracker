import React, { useState } from 'react'
import InputField from '../../../components/form/InputField'
import { useForm } from 'react-hook-form'
import DefaultButton from '../../../components/ui/DefaultButton';
import Button from '../../../components/ui/Button';
import { createDebtor } from '../services';
import toast from 'react-hot-toast';

const DebtorForm = ({close}) => {
    const {
        register,
        handleSubmit,
        formState: {errors}
    }=useForm();
    const [isDisabled, setIsDisabled] = useState(false)

    const addDebtor = async (data)=>{
        try {
            setIsDisabled(true)
            await toast.promise(
                createDebtor(data.name, data.contactNumber),
                {
                    loading: 'Adding debtor',
                    success: 'Debtor added successfully',
                    error: 'Could not add debtor',
                }
            )
        } catch (error) {
            console.log('Cannot add debtor: ', error)
        } finally{
            setIsDisabled(false)
            close();
        }
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
        errors={errors}
        disabled={isDisabled}/>
      
        <InputField
        id={'contactNumber'}
        label={'Contact number'}
        placeholder={'Enter contact number'}
        register={register}
        errors={errors}
        disabled={isDisabled}/>

        <footer className='flex items-center justify-end gap-2 mt-5'>
            <div>
                <DefaultButton
                onClick={close}
                disabled={isDisabled}>
                    Cancel
                </DefaultButton>
            </div>
            <div>
                <Button
                type='submit'
                disabled={isDisabled}>
                    Save
                </Button>    
            </div>
        </footer>
    </form>
  )
}

export default DebtorForm
