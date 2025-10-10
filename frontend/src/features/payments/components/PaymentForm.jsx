import React from 'react'
import InputField from '../../../components/form/InputField'
import { useForm } from 'react-hook-form'
import Dropdown from '../../../components/form/Dropdown';
import Button from '../../../components/button/Button';
import DefaultButton from '../../../components/button/DefaultButton';

const PaymentForm = ({
    isInputDisabled = false
}) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();
  return (
    <form
    className='flex flex-col gap-2 mt-5'>
      <InputField
      id={'amount'}
      label={'payment amount'}
      type={'number'}
      placeholder={'Enter payment amount'}
      register={register}
      rules={
          {
              required: 'Please enter payment amount'
          }
      }
      errors={errors}
      disabled={isInputDisabled}/>

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
      options={['CASH','GCASH','MAYA','OTHERS']}
      disabled={isInputDisabled}/>

      <footer className='flex items-center justify-end gap-2 mt-5'>
        <div>
            <DefaultButton
            disabled={isInputDisabled}>
                Cancel
            </DefaultButton>
        </div>
        <div>
            <Button
            disabled={isInputDisabled}>
                Confirm
            </Button>
        </div>
      </footer>
    </form>
  )
}

export default PaymentForm
