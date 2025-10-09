import Debtor from '../models/Debtor.js' 
import Debt from '../models/Debt.js'

export const addDebtor = async (req,res)=>{
    try {
        const {
            name,
            contactNumber
        }= req.body;

        //check if debtor exists
        const debtor = await Debtor.findOne({
            name: { $regex: `^${name}$`, $options: 'i' }
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

export const getDebtors = async (req, res)=>{
    try {
        const debtors = await Debtor.find({});

        return res.status(200).json({
            debtors,
            message: 'Debtors successfully retrieved'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: error,
            message: 'Failed to fetch debtors'
        })
    }
}

export const getDebtor = async (req, res)=>{
    try {
        const {id} = req.params;
        console.log('params', id)

        const debtor = await Debtor.findById(id)
        const debts = await Debt.find({userId: id});

        return res.status(200).json({
            debtor,
            debts,
            message: 'Debtor successfully retrieved'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: error,
            message: 'Failed to fetch debtor'
        })
    }
}

export const getDebtorSuggestion = async (req,res)=>{
    try {
        const {debtor} = req.query;
        
        const debtors = await Debtor.find(
            {name: { $regex: `^${debtor}`, $options: 'i' }},
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