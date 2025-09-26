import React from 'react'

const BiggestDebtHolderItem = () => {
  return (
    <div className='flex items-center gap-2'>
      <span className='flex items-center justify-center h-8 w-8 rounded-full bg-theme-gray text-white font-semibold'>1</span>
      <div className=''>
        <p className='text-theme-gray'>Juan Dela Cruz</p>
        <p className='text-sm text-gray-500'>Balance: Php 500</p>
        <p className='text-sm text-gray-500'>Last Payment: 9/16/2025</p>
      </div>
    </div>
  )
}

export default BiggestDebtHolderItem
