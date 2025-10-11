import Debt from "../models/Debt.js";
import Payment from "../models/Payment.js";

export const createPayment = async (req, res)=>{
    try {
        console.log('Creating payment: ', req.body)
        const { debtId, paymentMethod } = req.body;

        //create new payment
        await Payment.create({
            debtId,
            paymentMethod
        })

        //update debt status
        await Debt.findByIdAndUpdate(
            debtId,
            {
                status: 'paid'
            }
          );          

        return res.status(200).json({
            message: 'Payment created successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Cannot create payment. Server error'})
    }
}