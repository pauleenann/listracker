import api from "../../../lib/axios"

export const getDebtorSuggestion = async (debtor)=>{
    const {data} = await api.get('/debtors',{
        params:{
            debtor
        }
    })
    return data.debtors
}