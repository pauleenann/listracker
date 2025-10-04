import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import { addDebt, fetchDebt } from '../services';
import toast from 'react-hot-toast';

const useDebts = () => {
    const queryClient = useQueryClient();
    const [selectedData, setSelectedData] = useState(null);

    const {
        isLoading,
        isError,
        data,
        } = useQuery({
        queryKey:['debts'],
        queryFn: fetchDebt,
    });
        
    const mutation = useMutation({
        mutationFn: async (debt)=>{
            try {
            await toast.promise(
                addDebt(debt),
                {
                    loading: 'Adding debt',
                    success: 'Debt added successfully',
                    error: 'Could not add debt',
                }
            )
            } catch (error) {
                console.log(error)
            }
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries(['debts'])
        }
    })

    const filterSelectedData = (id)=>{
        if(!id){
            setSelectedData('')
        }else{
            const selected = data.find(f => f._id === id);

            if(!selected) return;
            
            setSelectedData({
                ...selected,
                dueDate: selected?.dueDate
                ? new Date(selected.dueDate).toISOString().split('T')[0]
                : ''
            })  
        }
        
    }

  return {
    isLoading,
    isError,
    data,
    addDebt: mutation.mutate,
    isAddingDebt:mutation.isLoading,
    filterSelectedData,
    selectedData,
  }
}

export default useDebts
