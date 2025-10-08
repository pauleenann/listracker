import React from 'react'
import { Puff } from 'react-loading-icons'

const Loading = () => {
  return (
    <div className='h-screen w-screen flex flex-col items-center justify-center overflow-hidden'>
        <Puff stroke="#3938EB" strokeOpacity=".125" />
    </div>
  )
}

export default Loading
