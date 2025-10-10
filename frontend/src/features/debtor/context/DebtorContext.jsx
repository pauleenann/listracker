import React, { createContext, useContext, useEffect, useState } from 'react'
import useModal from '../../../hooks/useModal';
import { useParams } from 'react-router';
import useDebtor from '../hooks/useDebtor';
import useConfirmationModal from '../../../hooks/useConfirmationModal';

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

    // form modal
    const {
        show, 
        openShow,
        closeShow,
        label
    } = useModal();

    //confirmation modal (delete)
    const deleteModal = useConfirmationModal();
    const payModal = useConfirmationModal();

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

        // confirmation modal
        showDeleteModal: deleteModal.showConfirmation,
        openDeleteModal: deleteModal.openConfirmation,
        closeDeleteModal: deleteModal.closeConfirmation,
        showPayModal: payModal.showConfirmation,
        openPayModal: payModal.openConfirmation,
        closePayModal: payModal.closeConfirmation,

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