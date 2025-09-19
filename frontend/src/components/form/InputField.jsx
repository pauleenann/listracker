import React from 'react'

const InputField = ({id, label, type='text', placeholder }) => {
  return (
    <div className='flex flex-col w-full'>
        <label htmlFor={id} className='text-gray-900'>{label}</label>
        <input 
        id={id}
        type={type} 
        className='border border-gray-300 h-12 px-3 rounded focus:outline-theme-blue'
        placeholder={placeholder}/>
    </div>
  )
}

export default InputField
