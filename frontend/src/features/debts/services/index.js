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