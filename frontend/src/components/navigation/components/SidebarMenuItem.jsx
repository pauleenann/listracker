import React from 'react'
import { Link, useLocation } from 'react-router'


const SidebarMenuItem = ({menu}) => {
    const location = useLocation();

    return (
        <Link 
        to={menu.path}
        className={`flex items-center gap-3 text-lg text-[#8D8D8D] py-2 ps-5 rounded-xl cursor-pointer  ${location.pathname == menu.path ? 'bg-theme-light-blue text-theme-blue hover:text-theme-blue' : 'hover:text-theme-gray'}`}>
            <i class={menu.icon}></i>
            <p className='font-semibold'>{menu.name}</p>
        </Link>
    )
}

export default SidebarMenuItem
