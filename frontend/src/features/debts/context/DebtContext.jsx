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
        filterSelectedData,
        selectedData,
        page,
        nextPage, 
        prevPage,
    } = useDebts();

    // useModal hook
    const {
        show, 
        openShow, 
        closeShow, 
        label
    } = useModal();

    // useConfirmation hook
    const {
        showConfirmation,
        openConfirmation,
        closeConfirmation
    } = useConfirmationModal();

    useEffect(()=>{
        setIsInputDisabled(isAddingDebt||isEditingDebt||label=='view debt')

        // disable search input if adding or editing
        // changing of debtor is not allowed when editing :)
        setIsSearchDisabled(isAddingDebt||isEditingDebt||label!='add debt')
    }, [label, isAddingDebt, isEditingDebt])


    let value = {
        // useDebts hook
        isLoading,
        isError,
        data,
        totalPages,
        addDebt,
        editDebt,
        deleteDebt,
        filterSelectedData,
        selectedData,

        // modal hook
        show,
        openShow,
        closeShow,
        label,

        // confirmation modal hook
        showConfirmation,
        openConfirmation,
        closeConfirmation,

        // disabled states
        isInputDisabled,
        isSearchDisabled,

        // pagination state
        page,
        nextPage, 
        prevPage,
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