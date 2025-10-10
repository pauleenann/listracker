import mongoose, {Schema, model} from 'mongoose'

const DebtSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Debtor',
        required: true
    },
    product: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    unitPrice:{
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['not paid', 'paid'],
        default: 'not paid',
        required: true
    },
    remarks: {
        type: String,
        default: 'n/a'
    },
    owedDate: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const Debt = model('Debt', DebtSchema);
export default Debt