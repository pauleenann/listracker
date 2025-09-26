import React from 'react'

const DebtTrComponent = ({data}) => {
    console.log(data)
  return (
    <tr className='text-theme-gray font-semibold'>
        <td className='py-3'>{data.id}</td>
        <td className='py-3'>{data.name}</td>
        <td className='py-3'>{data.product}</td>
        <td className='py-3'>{data.amount}</td>
        <td className='py-3'>{data.date}</td>
        <td className='py-3'>
            <span className={`
                uppercase py-1 px-2 text-xs rounded text-white
                ${data.status=='paid'?'bg-theme-blue':data.status=='not paid'?'bg-theme-gray':'bg-gray-500'}
            `}>
                {data.status}
            </span>
        </td>
        <td className='py-3'>{data.remarks}</td>
        <td className='py-3'>
            <button>
                <i className="fa-solid fa-ellipsis"></i>
            </button>
        </td>
    </tr>
  )
}

export default DebtTrComponent
