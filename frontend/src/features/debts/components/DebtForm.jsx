import React from 'react'
import InputField from '../../../components/form/InputField'
import { useForm } from 'react-hook-form'
import Dropdown from '../../../components/ui/Dropdown';
import { status } from '../../../data/statusOptions';
import DefaultButton from '../../../components/ui/DefaultButton';
import Button from '../../../components/ui/Button';
import SearchInput from '../../../components/form/SearchInput';
import { getDebtorSuggestion } from '../services';

const DebtForm = ({close}) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        control
    } = useForm();

    const addDebt = (data)=>{
        console.log(data)
    }

  return (
    <form
    onSubmit={handleSubmit(addDebt)}
    className='flex flex-col gap-2 mt-5'>
        <SearchInput
        id={'name'}
        label={'Debtor name'}
        placeholder={'Enter debtor name'}
        control={control}
        searchFn={getDebtorSuggestion}/>

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
        errors={errors}/>

        <InputField
        id={'amount'}
        label={'Amount'}
        type={'number'}
        placeholder={'Enter amount in peso'}
        register={register}
        rules={
            {
                required: 'Please enter amount'
            }
        }
        errors={errors}/>
        
        <InputField
        id={'duedate'}
        label={'Due date'}
        type={'date'}
        placeholder={'Enter due date'}
        register={register}
        rules={
            {
                required: 'Please enter due date'
            }
        }
        errors={errors}/>

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
        options={status}/>
        
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

export default DebtForm
