import api from "../../../lib/axios"

export const createDebtor = async (debtor)=>{
    console.log(debtor)
    const response = await api.post('/debtors',{
        name: debtor.name,
        contactNumber: debtor.contactNumber
    });
    return response
}

export const fetchDebtors = async ()=>{
    const response = await api.get('/debtors');
    return response.data.debtors
}

export const fetchDebtor = async (id)=>{
    const response = await api.get(`/debtors/${id}`);
    console.log(response)
    return response.data
}