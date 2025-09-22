export const signup = (req, res)=>{
    try {
        console.log(req.decoded)
        const {email} = req.decoded;
        
    } catch (error) {
        console.log(error)
        return res.status(500)
    }
}