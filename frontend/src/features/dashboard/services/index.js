import api from "../../../lib/axios"

export const fetchCardStats = async ()=>{
    const response = await api.get('/dashboard/stats');
    console.log(response.data)
    return response.data
}