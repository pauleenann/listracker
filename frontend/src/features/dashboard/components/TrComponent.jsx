import React from 'react'

const TrComponent = ({data}) => {
    console.log(data)
  return (
    <tr className='text-theme-gray font-semibold'>
        <td className='py-2'>{data.name}</td>
        <td className='py-2'>{data.item}</td>
        <td className='py-2'>Php {data.amount}</td>
        <td className='py-2'>{data.date}</td>
        <td className='py-2'>
            <span className={`
                uppercase p-1 text-xs rounded text-white
                ${data.status=='paid'?'bg-theme-blue':data.status=='not paid'?'bg-theme-gray':'bg-gray-500'}
            `}>
                {data.status}
            </span>
        </td>
    </tr>
  )
}

export default TrComponent
