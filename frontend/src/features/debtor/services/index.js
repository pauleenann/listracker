import api from "../../../lib/axios"

export const createDebtor = async (debtor)=>{
    console.log(debtor)
    const response = await api.post('/debtors',{
        name: debtor.name,
        contactNumber: debtor.contactNumber
    });
    return response
}

export const fetchDebtors = async (page, limit, search)=>{
    const response = await api.get('/debtors',{
        params: {
            page: page,
            limit: limit,
            search: search
        }
    });
    console.log(response.data)
    return response.data
}

export const fetchDebtorDebts = async (id, page, limit, search)=>{
    console.log('fetching debtor', id)
    const response = await api.get(`/debtors/debts/${id}`,{
        params: {
            page: page,
            limit: limit,
            search: search
        }   
    });

    console.log(response.data)
    return response.data;
}

export const fetchDebtor = async (id)=>{
    const response = await api.get(`/debtors/${id}`);
    console.log(response.data)
    return response.data.debtorInfo;
}