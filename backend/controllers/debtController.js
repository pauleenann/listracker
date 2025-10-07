import Debtor from "../models/Debtor.js";
import Debt from "../models/Debt.js"

export const addDebt = async (req, res)=>{
    try {
        const {
            name,
            product,
            quantity,
            unitPrice,
            owedDate,
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
            remarks: remarks,
            owedDate: owedDate
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

export const editDebt = async (req, res)=>{
    try {
        const {
            name,
            product,
            quantity,
            unitPrice,
            owedDate,
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

        await Debt.findOneAndUpdate(
            {userId: userId._id},
            {
                product: product,
                quantity: quantity,
                unitPrice: unitPrice,
                amount: unitPrice*quantity,
                status: status,
                remarks: remarks,
                owedDate: owedDate
            }
        )

        return res.status(200).json({
            message: 'Debt edited successfully'
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to add debt'
        })
    }
}

export const getDebts = async (req, res)=>{
    try {
        console.log('fetching debts', req.query)
        const {page = 1, limit = 5} = req.query;
        const skip = (page-1)*limit;

        //fetch total number of debts/documents in Debts
        const totalDebts = await Debt.countDocuments();

        const debts = await Debt.find().populate('userId','name').skip(skip).limit(limit);

        if(!debts){
            return res.status(404).json({
                message: 'No debts'
            })
        }

        const totalPages = Math.ceil(totalDebts/limit);
        const hasMore = page<totalPages;

        return res.status(200).json({
            debts,
            totalPages,
            hasMore,
            message: 'Debts successfully retrieved'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to get debts'
        })
    }
}

export const deleteDebt = async (req, res)=>{
    try {
        const {id} = req.params;
        console.log(id)

        await Debt.findByIdAndDelete(id);

        return res.status(200).json({
            message: 'Debt deleted successfully'
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to delete debts'
        })
    }
}