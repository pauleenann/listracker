import Debtor from '../models/Debtor.js' 

export const addDebtor = async (req,res)=>{
    try {
        const {
            name,
            contactNumber
        }= req.body;

        //check if debtor exists
        const debtor = await Debtor.findOne({
            name: new RegExp(`^${name}$`, 'i')
        });

        //throw error id debtor is not null
        if(debtor){
            return res.status(409).json({
                message: 'Debtor already exists',
            });
        }else{
            await Debtor.create({
                name: name,
                contactNumber: contactNumber
            })
        }

        return res.status(200).json({
            message: 'Debtor added successfully'
        })

        console.log(name, contactNumber)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: error,
            message: 'Failed to add debtor'
        })
    }
}

export const getDebtorSuggestion = async (req,res)=>{
    try {
        const {debtor} = req.query;
        
        const debtors = await Debtor.find(
            {name: new RegExp(`^${debtor}`, 'i')},
            {name: 1}
        )

        console.log(debtors)
        return res.status(200).json({
            debtors,
            message: 'Suggestions retrieved'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: error,
            message: 'Failed to retrieve suggestions'
        })
    }
}