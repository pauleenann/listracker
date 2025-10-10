import api from "../../../lib/axios"

export const payDebt = async (data)=>{
    console.log('paying debt: ', data)
    const response = await api.post(`/payments`, data);
    return response.data;
}