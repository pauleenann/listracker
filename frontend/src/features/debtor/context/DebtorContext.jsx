import React, { createContext, useContext, useEffect, useState } from 'react'
import useModal from '../../../hooks/useModal';
import { useParams } from 'react-router';
import useDebtor from '../hooks/useDebtor';

const DebtorContext = createContext();

export const DebtorProvider = ({children}) => {
    const [isInputDisabled, setIsInputDisabled] = useState(false);
    const [isSearchDisabled, setIsSearchDisabled] = useState(false);
    const {id} = useParams();

    const {
        isLoading,
        isError,
        data,
        selectedData,
        initializeSelectedData,
        editDebtorDebt,
        isEditing,
        deleteDebtorDebt,
        isDeleting
    } = useDebtor(id);

    const {
        show, 
        openShow,
        closeShow,
        label
    } = useModal();

    useEffect(()=>{
        setIsInputDisabled(isEditing||label=='view debt')
        setIsSearchDisabled(isEditing||label!='add debt')
    },[isEditing, label])

    let value = {
        //tanstack
        isLoading,
        isError,
        data,
        editDebtorDebt,
        deleteDebtorDebt,
        isInputDisabled,
        isSearchDisabled,

        // modal
        show,
        openShow,
        closeShow,
        label,

        // selectedData
        selectedData,
        initializeSelectedData
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