import React from 'react'

const DebtorTrComponent = ({data}) => {
    console.log(data)
  return (
    <tr className='text-theme-gray font-semibold'>
        <td className='py-3'>{data.id}</td>
        <td className='py-3'>{data.name}</td>
        <td className='py-3'>{data.contactNumber}</td>
        <td className='py-3'>Php {data.totalDebt}</td>
        <td className='py-3'>Php {data.totalPaid}</td>
        <td className='py-3'>Php {data.totalDebt - data.totalPaid}</td>
        <td className='py-3'>
            <span className={`
                uppercase py-1 px-2 text-xs rounded text-white
                ${data.status=='paid'?'bg-theme-blue':data.status=='not paid'?'bg-theme-gray':'bg-gray-500'}
            `}>
                {data.status}
            </span>
        </td>
        <td className='py-3'>{data.lastPayment||'N/A'}</td>
        <td className='py-3'>
            <button>
                <i className="fa-solid fa-ellipsis"></i>
            </button>
        </td>
    </tr>
  )
}

export default DebtorTrComponent
