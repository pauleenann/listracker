import React, { useState } from 'react'

const Table = ({
    header, 
    data,
    trComponent: TrComponent
}) => {
  return (
    <table className='w-full'>
      <thead>
        <tr>
            {header.map((head, i)=>(
                <td 
                key={i}
                className='py-2 border-b border-gray-300 text-gray-500 font-semibold'>
                    {head}
                </td>
            ))}
        </tr>
      </thead>
      <tbody>
        {data.length>0
        ?data.map((d, i)=>(
          <>
            <TrComponent 
            index={i}
            data={d}/>
          </> 
        ))
      :<tr>
        <td 
        colSpan={header.length} 
        className='text-center'>
          <div className='flex flex-col items-center mt-10 text-theme-blue font-semibold gap-1'>
            <i className="fa-solid fa-circle-exclamation text-4xl"></i>
            <span>No data available</span>
          </div>
        </td>
      </tr>}   
      </tbody>
    </table>
  )
}

export default Table
