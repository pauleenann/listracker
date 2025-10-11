import { createContext, useContext, useEffect, useState } from "react";
import useDebts from "../hooks/useDebts";
import useModal from "../../../hooks/useModal";
import useConfirmationModal from "../../../hooks/useConfirmationModal";

const DebtContext = createContext();

export const DebtProvider = ({children})=>{
    const [isInputDisabled, setIsInputDisabled] = useState(false);
    const [isSearchDisabled, setIsSearchDisabled] = useState(false);

    // useDebts hook
    const {
        isLoading,
        isError,
        data,
        totalPages,
        addDebt,
        isAddingDebt,
        editDebt,
        isEditingDebt,
        deleteDebt,
        payDebt,
        isPayingDebt,
        status,

        filterSelectedData,
        selectedData,

        page,
        nextPage, 
        prevPage,

        setSearchInput
    } = useDebts();

    // useModal hook
    const {
        show, 
        openShow, 
        closeShow, 
        label
    } = useModal();

    // useConfirmation hook
    const deleteModal = useConfirmationModal();
    const payModal = useConfirmationModal();

    useEffect(()=>{
        setIsInputDisabled(isAddingDebt||isEditingDebt||isPayingDebt||label=='view debt')

        // disable search input if adding or editing
        // changing of debtor is not allowed when editing :)
        setIsSearchDisabled(isAddingDebt||isEditingDebt||isPayingDebt||label!='add debt')
    }, [label, isAddingDebt, isEditingDebt, isPayingDebt])


    let value = {
        // useDebts hook
        isLoading,
        isError,
        data,
        totalPages,
        addDebt,
        editDebt,
        deleteDebt,
        payDebt,
        filterSelectedData,
        selectedData,
        status,

        // modal hook
        show,
        openShow,
        closeShow,
        label,

        // confirmation modal hook
        showDeleteModal: deleteModal.showConfirmation,
        openDeleteModal: deleteModal.openConfirmation,
        closeDeleteModal: deleteModal.closeConfirmation,
        showPayModal: payModal.showConfirmation,
        openPayModal: payModal.openConfirmation,
        closePayModal: payModal.closeConfirmation,

        // disabled states
        isInputDisabled,
        isSearchDisabled,

        // pagination state
        page,
        nextPage, 
        prevPage,

        //search input 
        setSearchInput
    }

    return (
        <DebtContext.Provider value={value}>
            {children}
        </DebtContext.Provider>
    )
}

export const useDebtContext = ()=>{
    return useContext(DebtContext)
}