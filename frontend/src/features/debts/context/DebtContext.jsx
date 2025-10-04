import { createContext, useContext, useEffect, useState } from "react";
import useDebts from "../hooks/useDebts";
import useModal from "../../../hooks/useModal";

const DebtContext = createContext();

export const DebtProvider = ({children})=>{
    const {
        isLoading,
        isError,
        data,
        addDebt,
        isAddingDebt
    } = useDebts();

    const {
        show, 
        openShow, 
        closeShow, 
        label
    } = useModal();

    const [openKey, setOpenKey] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(()=>{
        console.log('Show modal: ', show)
    },[show])

    let value = {
        isLoading,
        isError,
        data,
        addDebt,
        isAddingDebt,
        show,
        openShow,
        closeShow,
        label,
        openKey,
        setOpenKey,
        isOpen,
        setIsOpen
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