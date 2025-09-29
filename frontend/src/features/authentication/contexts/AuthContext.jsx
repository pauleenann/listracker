import { createContext, useContext, useEffect, useState } from "react";
import api from '../../../lib/axios'
import { useNavigate } from "react-router";
import { initializeAccessToken } from "../../../lib/axios";
import { setResetFn } from "../services";

const AuthContext = createContext()

export const AuthProvider = ({children})=>{
    console.log('this is context api')
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();

    const signIn = (user, token)=>{
        setUser(user);
        setAccessToken(token);

        //initialize access token for interceptors
        initializeAccessToken(token)
    }

    //clears states
    const resetAuth = ()=>{
        setUser(null);
        setAccessToken(null);
        initializeAccessToken(null);
        navigate('/')
    }

    useEffect(()=>{
        console.log(user, accessToken)
    },[user, accessToken])

    useEffect(()=>{
        const refreshToken = async ()=>{
            try {
                const {data} = await api.get('/auth/refresh-token');

                if(data){
                    setUser(data.user)
                    setAccessToken(data.accessToken)

                    //initialize access token for interceptors
                    initializeAccessToken(data.accessToken)

                    navigate('/dashboard'); //redirect to dashboard
                }
            } catch (error) {
                console.log('Cannot refresh token: ',error)
            } finally {
                setTimeout(()=>{
                  setLoading(false)  
                },3000)
            }
        }

        refreshToken();

        //initialize resetFn in js files for signout purposes
        setResetFn(resetAuth);
    },[])

    let data = {
        user,
        accessToken,
        signIn,
        loading,
        resetAuth
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=>useContext(AuthContext);