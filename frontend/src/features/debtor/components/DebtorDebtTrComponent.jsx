import React from 'react'
import { useDebtorContext } from '../context/DebtorContext'

const DebtorDebtTrComponent = ({
    index, 
    data, 
}) => {
    const {
        openShow,
        initializeSelectedData
    } = useDebtorContext();
  return (
    <tr 
    key={index}
    className='text-theme-gray font-semibold capitalize'>
        <td className='py-3'>{data._id.substring(0,10)}</td>
        <td className='py-3'>{data.product}</td>
        <td className='py-3'>{data.quantity}</td>
        <td className='py-3'>Php {data.unitPrice}</td>
        <td className='py-3'>Php {data.amount}</td>
        <td className='py-3'>{new Date(data.owedDate).toLocaleDateString("en-CA")} </td>
        <td className='py-3'>
            <span className={`
                uppercase py-1 px-2 text-xs rounded text-white
                ${data.status=='paid'?'bg-theme-blue':data.status=='not paid'?'bg-theme-gray':'bg-gray-500'}
            `}>
                {data.status}
            </span>
        </td>
        <td className='py-3'>{data.remarks||'N/A'}</td>
        <td 
        className='py-3 relative flex items-center gap-4'>
            <button
            className='cursor-pointer'
            onClick={()=>{
                initializeSelectedData(data)
                openShow('view debt')
            }}
           >
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </button>
            <button
            className='text-red-500 cursor-pointer'
           >
                <i className="fa-solid fa-trash"></i>
            </button>
        </td>
    </tr>
  )
}

export default DebtorDebtTrComponent
