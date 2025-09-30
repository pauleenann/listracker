import React, { useState } from 'react'
import { Controller } from 'react-hook-form';
import debounce from "lodash.debounce"

const SearchInput = ({
  id, 
  label, 
  type='text', 
  placeholder,
  control,
  searchFn
}) => {
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([])

  const handleSearch = debounce(async (search) => {
    console.log("Searching:", search)
    try {
      const data = await searchFn(search);
      console.log(data)
      setSuggestions(data)
    } catch (error) {
      console.log(error)
    }
  }, 500)

  return (
    <>
      <Controller
      name='debtor'
      control={control}
      defaultValue=''
      render={({field})=>(
        <div className='flex flex-col w-full relative'>
          <label htmlFor={id} className='text-gray-900'>{label}</label>
          <input 
          {...field}
          id={id}
          type={type} 
          placeholder={placeholder}
          className='border border-gray-300 h-12 px-3 rounded focus:outline-theme-blue'
          onFocus={()=>{
            setOpen(true)
          }}
          onChange={(e)=>{
            field.onChange(e.target.value);
            handleSearch(e.target.value);
          }}/>

          {open&&suggestions.length>0&&<div className='w-full min-h-10 max-h-20 absolute bg-gray-100 border border-gray-100 -bottom-21 rounded overflow-y-scroll scrollbar-none'>
            <ul>
              {suggestions.map((item)=>(
                <li 
                key={item._id}
                className='p-2 capitalize cursor-pointer'>
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
          }
      </div>
      )}/>
    </>
    
  )
}

export default SearchInput
