import React from 'react'
import { useNavigate } from 'react-router'

const DebtorTrComponent = ({data}) => {
    const navigate = useNavigate();
  return (
    <tr className='text-theme-gray font-semibold'>
        <td className='py-3'>{data._id.substring(0,10)}</td>
        <td className='py-3 capitalize'>{data.name}</td>
        <td className='py-3'>{data.contactNumber||'N/A'}</td>
        <td className='py-3'>Php {data.totalDebt}</td>
        <td className='py-3'>
            <span className={`
                uppercase py-1 px-2 text-xs rounded text-white
                ${data.status=='paid'?'bg-theme-blue': data.status=='not paid' ? 'bg-theme-gray' : 'bg-gray-300'}
            `}>
                {data.status}
            </span>
        </td>
        <td className='py-3'>{data.lastPayment||'N/A'}</td>
        <td className='py-3'>
            <button 
            className='cursor-pointer'
            onClick={()=>navigate(`/debtors/${data._id}`)}>
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </button>
        </td>
    </tr>
  )
}

export default DebtorTrComponent
