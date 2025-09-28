import React from 'react'

const DefaultButton = ({
    type='button', 
    onClick = ()=>{},
    children
}) => {
  return (
    <button 
    type={type}
    onClick={onClick}
    className='py-2 px-3 bg-white hover:bg-gray-100 rounded w-full text-theme-gray font-medium cursor-pointer'>
      {children}
    </button>
  )
}

export default DefaultButton
