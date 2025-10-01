import Debtor from "../models/Debtor.js";
import Debt from "../models/Debt.js"

export const addDebt = async (req, res)=>{
    try {
        const {
            name,
            product,
            quantity,
            unitPrice,
            dueDate,
            status,
            remarks
        } = req.body;
        
        // get user id
        const userId = await Debtor.findOne({name:name});

        if (!userId) {
            return res.status(404).json({
                message: 'Debtor does not exist',
            });
        }

        await Debt.create({
            userId: userId._id,
            product: product,
            quantity: quantity,
            unitPrice: unitPrice,
            amount: unitPrice*quantity,
            status: status,
            remarks: remarks,
            dueDate: dueDate
        })

        return res.status(200).json({
            message: 'Debt added successfully'
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to add debt'
        })
    }
}