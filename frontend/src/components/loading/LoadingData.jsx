import React from 'react'
import { Puff } from 'react-loading-icons'

const LoadingData = () => {
  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <Puff stroke="#3938EB" strokeOpacity=".125" />
    </div>
  )
}

export default LoadingData
