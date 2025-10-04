import React, { useContext, useEffect, useState } from 'react'
import { Controller } from 'react-hook-form';
import debounce from "lodash.debounce"
import { ErrorMessage } from '@hookform/error-message';
import { useDebtContext } from '../../features/debts/context/DebtContext';

const SearchInput = ({
  id, 
  label, 
  type='text', 
  placeholder,
  control,
  searchFn,
  errors,
  disabled
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
  
  useEffect(()=>{
    handleSearch('')
  },[])

  return (
    <>
      <Controller
      name={id}
      control={control}
      rules={{
        required: 'Input is required',
        validate: value=>suggestions.find(s=>s.name==value)||"Input does not exist"
      }}
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
          }}
          disabled={disabled}/>

          {open&&suggestions.length>0&&<div className='absolute top-full w-full max-h-20 bg-gray-100 border border-gray-100 rounded overflow-y-scroll scrollbar-none'>
            <ul>
              {suggestions.map((item)=>(
                <li 
                key={item._id}
                className='p-2 cursor-pointer hover:bg-theme-blue hover:text-white transition duration-100 ease-in-out'
                onMouseDown={(e) => {
                  e.preventDefault(); // Prevent onBlur from firing before onClick
                  field.onChange(item.name); // Update the input value
                  setOpen(false); // Close the dropdown
                }}>
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
          }
      </div>
      )}/>

      <ErrorMessage 
          errors={errors} 
          name={id}
          render={({ message }) => <p className='text-red-500 text-sm before:content-["⚠"] before:mr-1'>{message}</p>}
        />
    </>
    
  )
}

export default SearchInput
