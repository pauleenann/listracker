import React from 'react'

const DebtCards = ({
    label='label', 
    value=0, 
    color='bg-gray-200'
}) => {
  return (
    <article className='py-4 px-5 border border-gray-200 rounded-xl font-semibold text-theme-gray w-70 cursor-pointer hover:bg-theme-lightest-blue transition duration-200 ease-in-out'>
        <div className='flex items-center gap-2'>
            <div className={`h-3 w-3 rounded-full ${color}`}></div>
            <span className='capitalize'>{label}</span>
        </div>
        <p className='text-3xl'>{value}</p>
    </article>
  )
}

export default DebtCards
