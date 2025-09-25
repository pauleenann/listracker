import React from 'react'
import Sidebar from '../components/navigation/Sidebar'

const MainLayout = ({children}) => {
  return (
    <div className='w-screen h-screen flex overflow-x-hidden'>
        <Sidebar/>

        <div className='ms-[350px] w-full '>
            {children}
        </div>
    </div>
  )
}

export default MainLayout
