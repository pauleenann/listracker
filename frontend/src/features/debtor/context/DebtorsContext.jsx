import React, { createContext, useContext, useEffect, useState } from 'react'
import useModal from '../../../hooks/useModal';
import useDebtors from '../hooks/useDebtors';
import useConfirmationModal from '../../../hooks/useConfirmationModal';

const DebtorsContext = createContext();

export const DebtorsProvider = ({children}) => {
    const [selectedDebtor, setSelectedDebtor] = useState(null); 
    const {
      showConfirmation,
      openConfirmation,
      closeConfirmation
    } = useConfirmationModal();
    const {show, openShow, closeShow} = useModal();
    const [isInputDisabled, setIsInputDisabled] = useState();

    const {
        isLoading,
        isError,
        data,
        addDebtor,
        isAdding,
        deleteDebtor,
        isDeleting,

        //pagination
        totalPages,
        nextPage,
        prevPage,
        page,

        //search
        searchInput,
        setSearchInput
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
        deleteDebtor,

        // modal
        show,
        openShow,
        closeShow,
        showConfirmation,
        openConfirmation,
        closeConfirmation,

        //pagination
        totalPages,
        nextPage,
        prevPage,
        page,

        //search
        searchInput,
        setSearchInput,

        //selected debtor
        selectedDebtor,
        setSelectedDebtor
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
