import React from 'react'
import { useDebtContext } from '../context/DebtContext'

const DebtTrComponent = ({
    index, 
    data, 
}) => {
    const {
        openShow,
        filterSelectedData,
        openDeleteModal,
        openPayModal
    } = useDebtContext();

  return (
    <tr 
    key={index}
    className='text-theme-gray font-semibold capitalize'>
        <td className='py-3'>{data._id.substring(0,10)}</td>
        <td className='py-3'>{data.user.name}</td>
        <td className='py-3'>{data.product}</td>
        <td className='py-3'>{data.quantity}</td>
        <td className='py-3'>Php {data.unitPrice}</td>
        <td className='py-3'>Php {data.amount}</td>
        <td className='py-3'>{new Date(data.owedDate).toLocaleDateString("en-CA")} </td>
        <td className='py-3'>
            <span className={`
                uppercase py-1 px-2 text-xs rounded text-white
                ${data.status=='paid'?'bg-theme-blue': data.status=='not paid' ? 'bg-theme-gray' : 'bg-gray-300'}
            `}>
                {data.status}
            </span>
        </td>
        <td className='py-3'>{data.remarks||'N/A'}</td>
        <td 
        className='py-3 relative flex items-center gap-4'>
            <button
            className='cursor-pointer'
            onClick={() => {
                filterSelectedData(data._id)
                openShow('view debt');
            }}>
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </button>
            <button
            className='text-red-500 cursor-pointer'
            onClick={()=>{
                filterSelectedData(data._id)
                openDeleteModal();
            }}>
                <i className="fa-solid fa-trash"></i>
            </button>
            <button
            className='text-yellow-500 cursor-pointer'
            onClick={()=>{
                filterSelectedData(data._id);
                openPayModal();
            }}>
                <i className="fa-solid fa-coins"></i>
            </button>
        </td>
    </tr>
  )
}

export default DebtTrComponent
