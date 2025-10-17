import React, { createContext, useContext } from 'react'
import useDashboard from '../hooks/useDashboard';

const DashboardContext = createContext();

export const DashboardProvider = ({children}) => {
    const {
        statsLoading,
        statsError,
        totalDebts,
        totalCollected,
        paymentsToday,
        activeDebtors
    } = useDashboard();

    let value = {
        statsLoading,
        statsError,
        totalDebts,
        totalCollected,
        paymentsToday,
        activeDebtors
    }

    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    )
}


export const useDashboardContext = ()=>{
    return useContext(DashboardContext);
}