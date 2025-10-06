import { createContext, useContext, useEffect, useState } from "react";
import useDebts from "../hooks/useDebts";
import useModal from "../../../hooks/useModal";

const DebtContext = createContext();

export const DebtProvider = ({children})=>{
    const [isInputDisabled, setIsInputDisabled] = useState(false);
    const [isSearchDisabled, setIsSearchDisabled] = useState(false);

    // useDebts hook
    const {
        isLoading,
        isError,
        data,
        addDebt,
        isAddingDebt,
        editDebt,
        isEditingDebt,
        deleteDebt,
        filterSelectedData,
        selectedData
    } = useDebts();

    // useModal hook
    const {
        show, 
        openShow, 
        closeShow, 
        label
    } = useModal();

    useEffect(()=>{
        setIsInputDisabled(isAddingDebt||isEditingDebt||label=='view debt')

        // disable search input if adding or editing
        // changing of debtor is not allowed when editing :)
        setIsSearchDisabled(isAddingDebt||isEditingDebt||label!='add debt')
    }, [label, isAddingDebt])


    let value = {
        // useDebts hook
        isLoading,
        isError,
        data,
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

        // disabled states
        isInputDisabled,
        isSearchDisabled
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