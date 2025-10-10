import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

const PaymentSchema = new Schema({
    debtId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Debt',
        required: true
    },
    amountPaid: {
        
    }
})