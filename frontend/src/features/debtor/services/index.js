import api from "../../../lib/axios"

export const createDebtor = async (name, contactNumber)=>{
    const response = await api.post('/debtors',{
        name,
        contactNumber
    });
    console.log(response)
}