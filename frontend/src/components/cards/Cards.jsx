import React from 'react'

const Cards = ({label, children}) => {
  return (
    <article className='p-5 rounded-xl border border-gray-200 h-full w-full'>
      <p className='text-theme-gray font-semibold capitalize'>{label}</p>
      <div className='w-full h-full pt-3'>
        {children}
      </div>
    </article>
  )
}

export default Cards
