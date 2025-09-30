import React from 'react'
import { ErrorMessage } from "@hookform/error-message"

const Dropdown = ({
  id, 
  label, 
  register, 
  rules, 
  errors,
  options=[],
  disabled
}) => {
  return (
    <div className='flex flex-col w-full'>
        <label htmlFor={id} className='text-gray-900'>{label}</label>
        <select className='border border-gray-300 h-12 px-3 rounded focus:outline-theme-blue capitalize'
        {...register(id,rules)}
        disabled={disabled}>
            <option value="" selected disabled>Select status</option>
            {options.map((option, index)=>(
                <option 
                key={index}
                value={option} 
                className='capitalize'
                >
                    {option}
                </option>
            ))}
        </select>

        <ErrorMessage 
        errors={errors} 
        name={id}
        render={({ message }) => <p className='text-red-500 text-sm before:content-["⚠"] before:mr-1 mt-1'>{message}</p>}/>
    </div>
  )
}

export default Dropdown
