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
        //tanstack
        isDebtsError,
        isDebtsLoading,
        debts,
        isDebtorError,
        isDebtorLoading,
        debtor,
        selectedData,
        initializeSelectedData,
        addDebtorDebt,
        isAdding,
        editDebtorDebt,
        isEditing,
        deleteDebtorDebt,
        payDebtorDebt,

        //pagination
        page,
        nextPage,
        prevPage,
        totalPages,

        //search
        setSearchInput
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
        setIsInputDisabled(isEditing||isAdding||label=='view debt')
        setIsSearchDisabled(label=='add debt'||isEditing||isAdding)
    },[isEditing, isAdding, label])

    let value = {
        //tanstack
        isDebtsError,
        isDebtsLoading,
        debts,
        isDebtorError,
        isDebtorLoading,
        debtor,
        addDebtorDebt,
        editDebtorDebt,
        deleteDebtorDebt,
        payDebtorDebt,
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
        initializeSelectedData,

        //pagination
        page,
        nextPage,
        prevPage,
        totalPages,

        //search
        setSearchInput,
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