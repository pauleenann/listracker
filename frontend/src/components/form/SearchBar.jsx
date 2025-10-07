import React from 'react'

const SearchBar = ({
  placeholder = 'Search',
  onChange = ()=>{}
}) => {
  return (
    <div className='flex gap-2 items-center border border-gray-200 rounded-full px-4 w-full focus-within:border-theme-blue'>
      <input type="text" className='p-2 focus:outline-0 w-full' placeholder={placeholder}
      onChange={onChange}/>
      <i className="fa-solid fa-magnifying-glass text-theme-gray"></i>
    </div>
  )
}

export default SearchBar
