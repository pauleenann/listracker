import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext()

export const AuthProvider = ({children})=>{
    console.log('this is context api')
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null)

    const signIn = (user, token)=>{
        setUser(user);
        setAccessToken(token)
    }

    useEffect(()=>{
        console.log(user, accessToken)
    },[user, accessToken])

    let data = {
        user,
        accessToken,
        signIn
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=>useContext(AuthContext);