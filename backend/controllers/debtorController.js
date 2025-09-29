export const addDebtor = (req,res)=>{
    try {
        const {
            name,
            contactNumber
        }= req.body;

        console.log(name, contactNumber)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: error,
            message: 'Failed to add debtor'
        })
    }
}