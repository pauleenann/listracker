import { createContext, useContext, useEffect, useState } from "react";
import api from '../../../lib/axios'
import { useNavigate } from "react-router";

const AuthContext = createContext()

export const AuthProvider = ({children})=>{
    console.log('this is context api')
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();

    const signIn = (user, token)=>{
        setUser(user);
        setAccessToken(token)
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
                    navigate('/dashboard'); //redirect to dashboard
                }
            } catch (error) {
                console.log(error)
            } finally {
                setTimeout(()=>{
                  setLoading(false)  
                },3000)
            }
        }

        refreshToken();
    },[])

    let data = {
        user,
        accessToken,
        signIn,
        loading
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=>useContext(AuthContext);