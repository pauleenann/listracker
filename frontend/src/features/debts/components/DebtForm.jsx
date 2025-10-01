import React, { useState } from 'react'
import InputField from '../../../components/form/InputField'
import { useForm } from 'react-hook-form'
import Dropdown from '../../../components/form/Dropdown';
import { status } from '../../../data/statusOptions';
import DefaultButton from '../../../components/ui/DefaultButton';
import Button from '../../../components/ui/Button';
import SearchInput from '../../../components/form/SearchInput';
import { addDebt, getDebtorSuggestion } from '../services';
import toast from 'react-hot-toast';

const DebtForm = ({close}) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        control,
    } = useForm();
    const [isDisabled, setIsDisabled] = useState(false)

    const onSubmit = async (data)=>{
        try {
            setIsDisabled(true)
            await toast.promise(
                addDebt(data),
                {
                    loading: 'Adding debtor',
                    success: 'Debtor added successfully',
                    error: 'Could not add debtor',
                }
            )
        } catch (error) {
            console.log(error)
        } finally{
            setIsDisabled(false)
            close();
        }
    }

  return (
    <form
    onSubmit={handleSubmit(onSubmit)}
    className='flex flex-col gap-2 mt-5'>
        <SearchInput
        id={'name'}
        label={'Debtor name'}
        placeholder={'Enter debtor name'}
        control={control}
        searchFn={getDebtorSuggestion}
        errors={errors}/>

        <InputField
        id={'product'}
        label={'Product'}
        placeholder={'Enter product'}
        register={register}
        rules={
            {
                required: 'Please enter product'
            }
        }
        errors={errors}
        disabled={isDisabled}/>

        <InputField
        id={'quantity'}
        type='number'
        label={'Quantity'}
        placeholder={'Enter product quantity'}
        register={register}
        rules={
            {
                required: 'Please enter quantity'
            }
        }
        errors={errors}
        disabled={isDisabled}/>
        
        <InputField
        id={'unitPrice'}
        type='number'
        label={'Unit Price'}
        placeholder={'Enter unit price'}
        register={register}
        rules={
            {
                required: 'Please enter unit price'
            }
        }
        errors={errors}
        disabled={isDisabled}/>
        
        <InputField
        id={'dueDate'}
        label={'Due date'}
        type={'date'}
        placeholder={'Enter due date'}
        register={register}
        rules={
            {
                required: 'Please enter due date'
            }
        }
        errors={errors}
        disabled={isDisabled}/>

        <Dropdown
        id={'status'}
        label={'Status'}
        register={register}
        rules={
            {
                required: 'Please enter status'
            }
        }
        errors={errors}
        options={status}
        disabled={isDisabled}/>
        
        <InputField
        id={'remarks'}
        label={'Remarks'}
        type={'text'}
        placeholder={'Enter remarks'}
        register={register}
        rules={
            {
                required: false
            }
        }
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

export default DebtForm
