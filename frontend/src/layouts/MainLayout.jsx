import React from 'react'
import Sidebar from '../components/navigation/Sidebar'

const MainLayout = ({children}) => {
  return (
    <div className='w-full h-auto flex overflow-x-hidden'>
        <Sidebar/>

        <div className='ms-[350px] w-full'>
            {children}
        </div>
    </div>
  )
}

export default MainLayout
