import React, { createContext, useContext } from 'react'
import useModal from '../../../hooks/useModal';

const DebtorContext = createContext();

export const DebtorProvider = ({children}) => {
    const {
        show, 
        openShow,
        closeShow,
        label
    } = useModal();

    let value = {
        // modal
        show,
        openShow,
        closeShow,
        label
    }

  return (
    <DebtorContext.Provider value={value}>
        {children}
    </DebtorContext.Provider>
  )
}

export const useDebtorContext = ()=>{
    return useContext(DebtorContext)
}