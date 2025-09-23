import React from 'react'
import { Route, Routes } from 'react-router'
import ProtectedRoutes from './ProtectedRoutes'
import Dashboard from '../pages/Dashboard'

const PrivateRoutes = () => {
  return (
    <Routes>
        <Route element={<ProtectedRoutes/>}>
            <Route 
            path='/dashboard'
            element={<Dashboard/>}
            />
        </Route>
    </Routes>
  )
}

export default PrivateRoutes
