import api from "../../../lib/axios"

export const getDebtorSuggestion = async (debtor)=>{
    const {data} = await api.get('/debtors',{
        params:{
            debtor
        }
    })
    return data.debtors
}

export const addDebt = async(data)=>{
    const response = await api.post('/debts', data)
    console.log(response)
    return response
}

export const editDebt = async(data)=>{
    const response = await api.put('/debts', data)
    console.log(response)
    return response
}

export const deleteDebt = async(id)=>{
    const response = await api.delete(`/debts/${id}`)
    console.log(response)
    return response
}

export const fetchDebt = async (page, limit, search)=>{
    const response = await api.get('debts',{
        params: {
            page,
            limit,
            search
        }
    });
    console.log(response.data)
    return response.data
}