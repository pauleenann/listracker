import { auth } from '../../../lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth'

export const signup = async (email, password)=>{
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        )
        const user = userCredential.user;

        console.log(user)
    } catch (error) {
        console.error('Cannot sign up user. An error occurred: ', error)
        throw error;
    }
}