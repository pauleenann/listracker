import React from 'react'
import { Route, Routes } from 'react-router'
import ProtectedRoutes from './ProtectedRoutes'
import Dashboard from '../pages/Dashboard'
import Debts from '../pages/Debts'
import Debtors from '../pages/Debtors'
import Payments from '../pages/Payments'
import Settings from '../pages/Settings'
import DebtContainer from '../features/debts/container/DebtContainer'

const PrivateRoutes = () => {
  return (
    <Routes>
        <Route element={<ProtectedRoutes/>}>
            <Route 
            path='/dashboard'
            element={<Dashboard/>}
            />
            <Route 
            path='/debts'
            element={<DebtContainer/>}
            />
            <Route 
            path='/debtors'
            element={<Debtors/>}
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
