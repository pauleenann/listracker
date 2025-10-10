import React from 'react'
import { ErrorMessage } from "@hookform/error-message"

const InputField = ({
  id, 
  label, 
  type='text', 
  placeholder, 
  register, 
  rules, 
  errors,
  disabled 
}) => {
  return (
    <div className='flex flex-col w-full'>
        <label htmlFor={id} className='text-gray-900 capitalize'>{label}</label>
        <input 
        id={id}
        type={type} 
        className='border border-gray-300 h-12 px-3 rounded focus:outline-theme-blue'
        placeholder={placeholder}
        {...register(id, rules)}
        disabled={disabled}
        min={1}/>
        
        <ErrorMessage 
        errors={errors} 
        name={id}
        render={({ message }) => <p className='text-red-500 text-sm before:content-["⚠"] before:mr-1 mt-1'>{message}</p>}
        />
    </div>
  )
}

export default InputField
