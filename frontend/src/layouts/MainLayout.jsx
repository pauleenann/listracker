import React from 'react'
import Sidebar from '../components/navigation/Sidebar'
import Navbar from '../components/navigation/Navbar'

const MainLayout = ({children}) => {
  return (
    <div className='w-screen h-screen grid grid-cols-[350px_1fr]'>
        <Sidebar/>

        <div className='w-full h-full'>
            <Navbar/>
            {children}
        </div>
    </div>
  )
}

export default MainLayout
