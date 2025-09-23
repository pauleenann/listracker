import User from '../models/User.js'
import { setRefreshTokenCookie } from '../utils/cookie.js';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.js';

export const signup = async (req, res)=>{
    try {
        console.log(req.body)
        const {fname, lname, email} = req.body;

        let user = await User.findOne({email:email})
        
        if(!user){
            user = await User.create({
                firstName: fname,
                lastName: lname,
                email: email
            })
        }else{
            return res.status(500).json({
                message: 'User already exist!'
            })
        } 

        // payload
        const payload = {
            id: user._id,
            email: user.email
        }

        // generate tokens
        const accessToken = await generateAccessToken(payload)
        const refreshToken = await generateRefreshToken(payload)

        // store refresh tokens in cookies
        await setRefreshTokenCookie(res, refreshToken)

        return res.status(200).json({
            accessToken,
            user,
            message: 'User created successfully!'
        })
    } catch (error) {
        console.log(error)
        return res.status(500)
    }
}