import React from 'react'
import { useAuth } from '../features/authentication/contexts/AuthContext'
import { Navigate, Outlet } from 'react-router';

const ProtectedRoutes = () => {
    const {user} = useAuth();

    if (!user) return <Navigate to="/" />;

    return <Outlet/>;
}

export default ProtectedRoutes
