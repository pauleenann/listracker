import React from 'react'

const Button = ({
  type='button', 
  onClick = ()=>{},
  children
}) => {
  return (
    <button 
    type={type}
    onClick={onClick}
    className='py-2 px-3 bg-theme-blue hover:bg-blue-800 rounded w-full text-white font-medium cursor-pointer'>
      {children}
    </button>
  )
}

export default Button
