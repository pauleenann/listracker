import React from 'react'
import { Route, Routes } from 'react-router'
import ProtectedRoutes from './ProtectedRoutes'
import Dashboard from '../pages/Dashboard'
import Debts from '../pages/Debts'
import Debtors from '../pages/Debtors'
import Payments from '../pages/Payments'
import Settings from '../pages/Settings'
import { DebtProvider } from '../features/debts/context/DebtContext'
import { DebtorsProvider } from '../features/debtor/context/DebtorsContext'
import Debtor from '../pages/Debtor'
import { DebtorProvider } from '../features/debtor/context/DebtorContext'
import { DashboardProvider } from '../features/dashboard/context/DashboardContext'

const PrivateRoutes = () => {
  return (
    <Routes>
        <Route element={<ProtectedRoutes/>}>
            <Route 
            path='/dashboard'
            element={<DashboardProvider>
              <Dashboard/>
            </DashboardProvider>}
            />
            <Route 
            path='/debts'
            element={<DebtProvider>
              <Debts/>  
            </DebtProvider>}
            />
            <Route 
            path='/debtors'
            element={<DebtorsProvider>
              <Debtors/>
            </DebtorsProvider>
            }
            />
            <Route 
            path='/debtors/:id'
            element={<DebtorProvider>
              <Debtor/>
            </DebtorProvider>}
            />
            <Route 
            path='/payments'
            element={<Payments/>}
            />
            <Route 
            path='/settings'
            element={<Settings/>}
            />
        </Route>
    </Routes>
  )
}

export default PrivateRoutes
