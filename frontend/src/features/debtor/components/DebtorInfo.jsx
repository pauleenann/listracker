import React from 'react'

const DebtorInfo = ({debtor}) => {
  return (
    <div className='w-full h-auto rounded-xl bg-theme-lightest-blue p-10 flex flex-col items-center justify-center font-medium mt-4'>
        {/* user letter profile */}
        <div className='h-20 w-20 bg-theme-blue rounded-full flex items-center justify-center text-white capitalize text-5xl mb-4'>
            {debtor?.name?.substring(0,1)||''}
        </div>
        <p>Debtor name: <span className='capitalize font-semibold'>{debtor.name}</span></p>
        <p>Contact number: <span className='capitalize font-semibold'>{debtor.contactNumber || 'N/A'}</span></p>
      
    </div>
  )
}

export default DebtorInfo
