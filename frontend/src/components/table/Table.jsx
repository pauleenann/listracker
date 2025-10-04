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
        {data.map((d, i)=>(
          <>
            <TrComponent 
            index={i}
            data={d}/>
          </> 
        ))}   
      </tbody>
    </table>
  )
}

export default Table
