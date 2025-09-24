import React from 'react'
import logo from '../../assets/images/logo.png'
import List from '../list/List'
import SidebarMenuItem from '../list/SidebarMenuItem'
import { mainMenu } from '../../data/sidebarMenu'

const Sidebar = () => {
  return (
    <div className='w-full h-full bg-theme-lightest-blue py-15 px-8'>
        <header className='flex items-center gap-4'>
            <img src={logo} alt="Logo" className='h-8'/>
            <p className='font-semibold text-3xl text-theme-gray'>Listracker</p>
        </header>

        {/* sidebar menu */}
        <div className='mt-12'>
            <List
            items={mainMenu}
            resourceName={'menu'}
            itemComponent={SidebarMenuItem}/>    
        </div>
        
      
    </div>
  )
}

export default Sidebar
