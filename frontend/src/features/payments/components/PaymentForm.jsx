import React from 'react'
import InputField from '../../../components/form/InputField'
import { useForm } from 'react-hook-form'
import Dropdown from '../../../components/form/Dropdown';
import Button from '../../../components/button/Button';
import DefaultButton from '../../../components/button/DefaultButton';

const PaymentForm = ({
    isInputDisabled = false,
    handleClick = ()=>{},
    close
}) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();
  return (
    <form
    className='flex flex-col gap-2 mt-5'>

      <Dropdown
      id={'paymentMethod'}
      label={'payment method'}
      placeholder={'Select payment method'}
      register={register}
      rules={
        {
            required: 'Please choose payment method'
        }
      }
      errors={errors}
      options={['cash', 'gcash', 'maya']}
      disabled={isInputDisabled}/>

      <footer className='flex items-center justify-end gap-2 mt-5'>
        <div>
            <DefaultButton
            disabled={isInputDisabled}
            onClick={close}>
                Cancel
            </DefaultButton>
        </div>
        <div>
            <Button
            disabled={isInputDisabled}
            onClick={handleSubmit(handleClick)}>
                Confirm
            </Button>
        </div>
      </footer>
    </form>
  )
}

export default PaymentForm
