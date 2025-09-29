import { verifyAccessToken } from "../utils/jwt";

export const authenticateUser = async (req, res, next)=>{
    try {
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
        
        //verify token
        await verifyAccessToken(token);

        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            error: error,
            message: 'Failed to authenticate user'
        })
    }
}