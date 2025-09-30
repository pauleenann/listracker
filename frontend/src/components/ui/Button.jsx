import React from 'react'

const Button = ({
  type='button', 
  disabled,
  onClick = ()=>{},
  children
}) => {
  return (
    <button 
    type={type}
    onClick={onClick}
    className={`
      ${disabled?'bg-gray-300':'bg-theme-blue hover:bg-blue-800'}
      py-2 px-3 rounded w-full text-white font-medium cursor-pointer`
    }
    disabled={disabled}>
      {children}
    </button>
  )
}

export default Button
