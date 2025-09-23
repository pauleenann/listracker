import admin from "../config/firebase.js";

export const authenticate = async (req, res, next)=>{
    try {
        console.log('authenticating token')
        const authHeader = req.headers.authorization;
        
        if(!authHeader){
            return res.status(500).json({
                message: 'Authorization header null'
            })
        }

        const token = authHeader.substring(7);

        if(!token){
            return res.status(500).json({
                message: 'Token empty'
            })
        }

        await admin.auth().verifyIdToken(token);

        next();
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error:error
        })
    }
}