import User from '../models/User.js'
import { clearRefreshTokenCookie, setRefreshTokenCookie } from '../utils/cookie.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt.js';

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
            return res.status(400).json({
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
        return res.status(500).json({
            error:error,
            message: 'Error signing up'
        })
    }
}

export const signout = async (req, res)=>{
    try {
        // clear cookie
        await clearRefreshTokenCookie(res);

        return res.status(200).json({
            message: 'Cookie cleared successfully'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: error,
            message: 'Failed signing out'
        })
    }
}

export const generateNewAccessToken = async (req, res)=>{
    try {
        console.log('generating new access token')
        console.log('req cookies',req.cookies)
        const {refreshToken} = req.cookies;

        if(!refreshToken){
            return res.status(400).json({
                message: 'No refresh token' 
            })
        }

        // verify refresh token
        const isVerified = await verifyRefreshToken(refreshToken);
        console.log(isVerified)
        
        if(!isVerified){
            await clearRefreshTokenCookie(res); // clear refresh token
            return res.status(400).json({
                message: 'Refresh token expired'
            })
        }

        const payload ={
            id: isVerified.id,
            email: isVerified.email
        }

        //get user info
        const user = await User.findOne({email:isVerified.email});

        if(!user){
            return res.status(400).json({
                message: 'User not found'
            })
        }

        // generate new access token 
        const accessToken = await generateAccessToken(payload);

        return res.status(200).json({
            accessToken,
            user,
            message: 'Access token generated successfully!'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error:error,
            message: 'Error generating new access token. Refresh token is expired.'
        })
    }
}