import { auth } from '../../../lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

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