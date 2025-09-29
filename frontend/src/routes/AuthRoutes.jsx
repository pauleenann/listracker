import React from 'react'
import { useAuth } from '../features/authentication/contexts/AuthContext'
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import Loading from '../components/ui/Loading';

const AuthRoutes = () => {
    const {loading, user} = useAuth();

    if(loading) return <Loading/>
    
    return user ? <PrivateRoutes/> : <PublicRoutes/>
}

export default AuthRoutes
