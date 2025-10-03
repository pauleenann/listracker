import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { addDebt, fetchDebt } from '../services';
import toast from 'react-hot-toast';

const useDebts = () => {
    const queryClient = useQueryClient();
    
    const {
        isLoading,
        isError,
        data,
        } = useQuery({
        queryKey:['debts'],
        queryFn: fetchDebt
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

  return {
    isLoading,
    isError,
    data,
    addDebt: mutation.mutate,
    isAddingDebt:mutation.isLoading
  }
}

export default useDebts
