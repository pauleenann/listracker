import React from 'react'
import InputField from '../../../components/form/InputField'
import { useForm } from 'react-hook-form'
import DefaultButton from '../../../components/button/DefaultButton';
import Button from '../../../components/button/Button';
import { useDebtorsContext } from '../context/DebtorsContext';

const DebtorForm = ({handleAddDebtor}) => {
    const {
        register,
        handleSubmit,
        formState: {errors}
    }=useForm();

    const {
        closeShow,
        isInputDisabled,
    } = useDebtorsContext();

  return (
    <form 
    onSubmit={handleSubmit(handleAddDebtor)}
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
        disabled={isInputDisabled}/>
      
        <InputField
        id={'contactNumber'}
        label={'Contact number'}
        placeholder={'Enter contact number'}
        register={register}
        errors={errors}
        disabled={isInputDisabled}/>

        <footer className='flex items-center justify-end gap-2 mt-5'>
            <div>
                <DefaultButton
                onClick={closeShow}
                disabled={isInputDisabled}>
                    Cancel
                </DefaultButton>
            </div>
            <div>
                <Button
                type='submit'
                disabled={isInputDisabled}>
                    Save
                </Button>    
            </div>
        </footer>
    </form>
  )
}

export default DebtorForm
