import admin from "../config/firebase";

export const authenticate = async (req, res, next)=>{
    try {
        console.log('authenticating token')
        const authHeader = req.headers.authorization;
        
        if(!authHeader){
            return res.status(500).json({
                message: 'Authorization header null'
            })
        }

        const token = authHeader.subString(7);

        const decoded = await admin.auth().verifyIdToken(token);

        //send decoded with request
        req.decoded = decoded;

        next();
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error:error
        })
    }
}