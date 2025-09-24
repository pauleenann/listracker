import React from 'react'

const Navbar = ({menu}) => {
  return (
    <nav className='p-10'>
        <h1 className='text-3xl font-semibold text-theme-gray'>{menu}</h1>
    </nav>
  )
}

export default Navbar
