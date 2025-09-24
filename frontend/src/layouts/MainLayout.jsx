import React from 'react'
import Sidebar from '../components/navigation/Sidebar'

const MainLayout = ({children}) => {
  return (
    <div className='w-screen h-screen grid grid-cols-[350px_1fr]'>
        <Sidebar/>

        <div className='w-full h-full'>
            {children}
        </div>
    </div>
  )
}

export default MainLayout
