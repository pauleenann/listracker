import React from 'react'

const DefaultButton = ({
    type='button',
    disabled = false, 
    onClick = ()=>{},
    children
}) => {
  return (
    <button 
    type={type}
    onClick={onClick}
    className={`
      ${disabled?'bg-gray-300 text-white':'bg-white hover:bg-gray-100 text-theme-gray'}
      py-2 px-3  rounded w-full font-medium cursor-pointer`
    }
    disabled={disabled}>
      {children}
    </button>
  )
}

export default DefaultButton
