import mongoose, {Schema, model} from 'mongoose'

const DebtorSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    contactNumber:{
        type: String
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

const Debtor = model('Debtor', DebtorSchema);
export default Debtor