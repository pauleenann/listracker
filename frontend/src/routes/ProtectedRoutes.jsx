import React from 'react'
import { useAuth } from '../features/authentication/contexts/AuthContext'
import { Navigate, Outlet } from 'react-router';

const ProtectedRoutes = () => {
    const {accessToken} = useAuth();

  return accessToken ? <Outlet/> : <Navigate to='/'/>
}

export default ProtectedRoutes
