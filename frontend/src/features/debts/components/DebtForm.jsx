import React from 'react'
import InputField from '../../../components/form/InputField'
import { useForm } from 'react-hook-form'
import Dropdown from '../../../components/form/Dropdown';
import { status } from '../../../data/statusOptions';
import DefaultButton from '../../../components/ui/DefaultButton';
import Button from '../../../components/ui/Button';
import SearchInput from '../../../components/form/SearchInput';
import { getDebtorSuggestion } from '../services';
import { useDebtContext } from '../context/DebtContext';

const DebtForm = ({handleAddDebt}) => {
    const {
        selectedData,
        closeShow,
        label,
        isInputDisabled,
        isSearchDisabled
    } = useDebtContext();

    const {
        register,
        handleSubmit,
        formState: {errors},
        control,
    } = useForm({
        defaultValues: selectedData || {}
    });
  

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
        disabled={isSearchDisabled}/>

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
        disabled={isInputDisabled}/>

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
        disabled={isInputDisabled}/>
        
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
        disabled={isInputDisabled}/>
        
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
        disabled={isInputDisabled}/>

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
        disabled={isInputDisabled}/>
        
        <InputField
        id={'remarks'}
        label={'Remarks'}
        type={'text'}
        placeholder={'Enter remarks'}
        register={register}
        errors={errors}
        disabled={isInputDisabled}/>

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
            </>}
        </footer>
    </form>
  )
}

export default DebtForm
