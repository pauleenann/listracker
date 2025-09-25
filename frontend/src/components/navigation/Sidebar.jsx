import React from 'react'
import logo from '../../assets/images/logo.png'
import List from '../list/List'
import SidebarMenuItem from './components/SidebarMenuItem'
import { accountMenu, mainMenu } from '../../data/sidebarMenu'

const Sidebar = () => {
  return (
    <aside className='fixed top-0 bottom-0 w-[350px] bg-theme-lightest-blue pt-15 pb-5 px-8 flex flex-col justify-between'>
        <main>
            <header className='flex items-center gap-4'>
                <img src={logo} alt="Logo" className='h-8'/>
                <p className='font-semibold text-3xl text-theme-gray'>Listracker</p>
            </header>

            {/* main menu */}
            <section className='mt-12'>
                <List
                items={mainMenu}
                resourceName={'menu'}
                itemComponent={SidebarMenuItem}/>    
            </section>

            {/* accounts menu */}
            <section className='mt-5'>
                <p className='text-sm font-semibold text-gray-300'>ACCOUNT</p>
                <List
                items={accountMenu}
                resourceName={'menu'}
                itemComponent={SidebarMenuItem}/>    
            </section>    
        </main>
        
        <footer className='bg-theme-light-blue rounded-xl py-4 px-5 flex items-center justify-between'>
            {/* user */}
            <div className='flex items-center gap-3'>
                <img src="" alt="User Profile Picture" className='border-0 w-10 h-10 rounded-full bg-theme-blue'/>
                <div className='text-sm'>
                    <p className='font-semibold text-theme-gray'>Username</p>
                    <p className='text-gray-500'>UserRole</p>
                </div>
            </div>
            <button 
            className='text-theme-gray cursor-pointer' 
            aria-label='More options'>
                <i className="fa-solid fa-ellipsis"></i>
            </button>
        </footer>
    </aside>
  )
}

export default Sidebar
