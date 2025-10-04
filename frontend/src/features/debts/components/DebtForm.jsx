import React, { useEffect, useState } from 'react'
import InputField from '../../../components/form/InputField'
import { useForm } from 'react-hook-form'
import Dropdown from '../../../components/form/Dropdown';
import { status } from '../../../data/statusOptions';
import DefaultButton from '../../../components/ui/DefaultButton';
import Button from '../../../components/ui/Button';
import SearchInput from '../../../components/form/SearchInput';
import { getDebtorSuggestion } from '../services';
import { useDebtContext } from '../context/DebtContext';

const DebtForm = () => {
    const {
        disabled,
        addDebt,
        selectedData,
        openShow,
        closeShow,
        label
    } = useDebtContext();

    const {
        register,
        handleSubmit,
        formState: {errors},
        control,
    } = useForm({
        defaultValues: selectedData || {}
    });
  
    const handleAddDebt = (debt)=>{
        switch(label){
            case 'view debt':
                openShow('edit debt')
                break
            case 'edit debt':
                console.log('edited')
                break
            default:
                addDebt(debt)
                closeShow();
        }
        
    }

  return (
    <form
    onSubmit={handleSubmit(handleAddDebt)}
    className='flex flex-col gap-2 mt-5'>
        <SearchInput
        id={'name'}
        label={'Debtor name'}
        placeholder={'Enter debtor name'}
        control={control}
        searchFn={getDebtorSuggestion}
        errors={errors}
        disabled={disabled}/>

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
        disabled={disabled}/>

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
        disabled={disabled}/>
        
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
        disabled={disabled}/>
        
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
        disabled={disabled}/>

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
        disabled={disabled}/>
        
        <InputField
        id={'remarks'}
        label={'Remarks'}
        type={'text'}
        placeholder={'Enter remarks'}
        register={register}
        errors={errors}
        disabled={disabled}/>

        <footer className='flex items-center justify-end gap-2 mt-5'>
            {label=='view debt'
            ?<div>
                <Button
                type='submit'>
                    Edit
                </Button>    
            </div>
            :<>
                <div>
                    <DefaultButton
                    onClick={closeShow}
                    disabled={disabled}>
                        Cancel
                    </DefaultButton>
                </div>
                <div>
                    <Button
                    type='submit'
                    disabled={disabled}>
                        Save
                    </Button>    
                </div>
            </>}
            
        </footer>
    </form>
  )
}

export default DebtForm
