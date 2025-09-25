import React from 'react'

const StatCards = ({label, value}) => {
    const isTotalDebts = label == 'total debts';
    console.log(label, isTotalDebts)
  return (
    <article className={`${isTotalDebts? 'bg-theme-blue':'bg-white border border-gray-200'} py-4 px-5 rounded-xl`}>
        <p className={`${isTotalDebts ? 'text-white' : 'text-theme-gray'} font-semibold capitalize`} >{label}</p>
        <p className={`${isTotalDebts ? 'text-white' : 'text-theme-blue'} font-bold text-3xl`}>{value}</p>
    </article>
  )
}

export default StatCards
