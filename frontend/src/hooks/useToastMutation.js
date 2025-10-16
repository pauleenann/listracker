import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast';

const useToastMutation = (mutationFn, message, queryKey = []) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (debt)=>{
            try {
            await toast.promise(
                mutationFn(debt),
                {
                    loading: message.loading,
                    success: message.success,
                    error: message.error,
                }
            )
            } catch (error) {
                console.log(error)
                toast.error(error?.response?.data?.message || 'An error occurred')
            }
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries(queryKey)
        }
    })
}

export default useToastMutation
