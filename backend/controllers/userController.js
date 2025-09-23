import User from '../models/User.js'

export const signup = async (req, res)=>{
    try {
        console.log(req.body)
        const {fname, lname, email} = req.body;

        let user = await User.findOne({email})
        
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

        return res.status(200).json({
            user,
            message: 'User created successfully!'
        })
    } catch (error) {
        console.log(error)
        return res.status(500)
    }
}