import React from 'react'

const Button = ({type, children}) => {
  return (
    <button 
    type={type}
    className='h-12 bg-theme-blue rounded w-full text-white font-medium cursor-pointer'>
      {children}
    </button>
  )
}

export default Button
