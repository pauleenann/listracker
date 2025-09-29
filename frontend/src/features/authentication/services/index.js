import { auth } from '../../../lib/firebase';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import axios from 'axios'
import api from '../../../lib/axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
let resetFn = null;

export const signup = async (fname, lname, email, password)=>{
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        )
        const user = userCredential.user;

        //get token
        const token = await user.getIdToken();

        //pass token in authorization header
        const response = await axios.post(
            `${API_BASE_URL}/auth/signup`,
            {
                fname,
                lname,
                email
            },
            {
                headers:{
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            }
        )
                    
        return response
    } catch (error) {
        console.error('Cannot sign up user. An error occurred: ', error)
        throw error;
    }
}

export const setResetFn = (fn)=>{
    resetFn = fn;
}

export const signout = async ()=>{
    // clear refresh token, access token, user info, signout to firebase
    try {
        console.log('signing out')
        // clear cookie
        const response = await api.post('/auth/signout');
        console.log(response)

        // signout to firebase
        await signOut(auth);
        
        //clear context api
        if(resetFn) resetFn();

    } catch (error) {
        console.log('Cannot sign out: ', error)
    }
}