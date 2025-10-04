import { createContext, useContext, useEffect, useState } from "react";
import useDebts from "../hooks/useDebts";
import useModal from "../../../hooks/useModal";

const DebtContext = createContext();

export const DebtProvider = ({children})=>{
    const [disabled, setDisabled] = useState(false);

    // useDebts hook
    const {
        isLoading,
        isError,
        data,
        addDebt,
        isAddingDebt,
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
        setDisabled(isAddingDebt||label=='view debt')
    }, [label, isAddingDebt])

    let value = {
        // useDebts hook
        isLoading,
        isError,
        data,
        addDebt,
        filterSelectedData,
        selectedData,

        // modal hook
        show,
        openShow,
        closeShow,
        label,
        
        disabled
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