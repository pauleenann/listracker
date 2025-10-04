import React from 'react'
import { useDebtContext } from '../context/DebtContext'

const DebtTrComponent = ({
    index, 
    data, 
}) => {
    const {
        openKey, 
        setOpenKey, 
        isOpen, 
        setIsOpen,
        openShow
    } = useDebtContext();

  return (
    <tr 
    onClick={()=>setIsOpen(false)}
    key={index}
    className='text-theme-gray font-semibold capitalize'>
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
        <td 
        className='py-3 relative'>
            {index==openKey&&isOpen&&<div className='absolute top-full shadow bg-gray-100 z-1 rounded w-15'>
                <ul className='text-sm'>
                    <li 
                    className='cursor-pointer p-2'
                    onClick={(e)=>{
                        e.stopPropagation();
                        console.log('view')
                        openShow('View Debt');
                    }}>View</li>
                </ul>
            </div>}
            <button
            className='cursor-pointer'
            onClick={(e) => {
                e.stopPropagation();
                console.log('clicked');
                if (openKey === index) {
                  setIsOpen(!isOpen);
                } else {
                  setOpenKey(index);
                  setIsOpen(true);
                }
            }}>
                <i className="fa-solid fa-ellipsis"></i>
            </button>
        </td>
    </tr>
  )
}

export default DebtTrComponent
