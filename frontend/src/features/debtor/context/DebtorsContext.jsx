import React, { createContext, useContext, useEffect, useState } from 'react'
import useModal from '../../../hooks/useModal';
import useDebtors from '../hooks/useDebtors';

const DebtorsContext = createContext();

export const DebtorsProvider = ({children}) => {
    const {show, openShow, closeShow} = useModal();
    const [isInputDisabled, setIsInputDisabled] = useState();

    const {
        isLoading,
        isError,
        data,
        addDebtor,
        isAdding
    } = useDebtors();

    useEffect(()=>{
      setIsInputDisabled(isAdding)
    },[isAdding])

    let value = {
        //disable
        isInputDisabled,
        
        //tanstack
        isLoading,
        isError,
        data,
        addDebtor,

        // modal
        show,
        openShow,
        closeShow
    }
    
  return (
    <DebtorsContext.Provider value={value}>
      {children}
    </DebtorsContext.Provider>
  )
}

export const useDebtorsContext = ()=>{
    return useContext(DebtorsContext)
}
