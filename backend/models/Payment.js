import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

const PaymentSchema = new Schema({
    debtId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Debt',
        required: true
    },
    amountPaid: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['cash', 'gcash', 'maya'],
        required: true
    },
    paymentDate: {
        type: Date,
        default: Date.now
    }
})

const Payment = model('Payment', PaymentSchema);

export default Payment;