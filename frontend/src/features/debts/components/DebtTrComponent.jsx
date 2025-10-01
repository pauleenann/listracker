import React from 'react'

const DebtTrComponent = ({data}) => {
    console.log(data)
  return (
    <tr className='text-theme-gray font-semibold capitalize'>
        <td className='py-3'>{data._id.substring(0,10)}</td>
        <td className='py-3'>{data.userId.name}</td>
        <td className='py-3'>{data.product}</td>
        <td className='py-3'>{data.quantity}</td>
        <td className='py-3'>Php {data.unitPrice}</td>
        <td className='py-3'>Php {data.amount}</td>
        <td className='py-3'>{new Date(data.dueDate).toLocaleDateString("en-CA")} </td>
        <td className='py-3'>
            <span className={`
                uppercase py-1 px-2 text-xs rounded text-white
                ${data.status=='paid'?'bg-theme-blue':data.status=='not paid'?'bg-theme-gray':'bg-gray-500'}
            `}>
                {data.status}
            </span>
        </td>
        <td className='py-3'>{data.remarks||'N/A'}</td>
        <td className='py-3'>
            <button>
                <i className="fa-solid fa-ellipsis"></i>
            </button>
        </td>
    </tr>
  )
}

export default DebtTrComponent
