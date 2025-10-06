import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import { addDebt, deleteDebt, editDebt, fetchDebt } from '../services';
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
        
    const mutationAdd = useMutation({
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

    const mutationEdit = useMutation({
        mutationFn: async (debt)=>{
            try {
            await toast.promise(
                editDebt(debt),
                {
                    loading: 'Editing debt',
                    success: 'Debt edited successfully',
                    error: 'Could not edit debt',
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

    const mutationDelete = useMutation({
        mutationFn: async (id)=>{
            try {
            await toast.promise(
                deleteDebt(id),
                {
                    loading: 'Deleting debt',
                    success: 'Debt deleted successfully',
                    error: 'Could not delete debt',
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
                name: selected?.userId?.name,
                // convert dueDate to YYYY-MM-DD
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
    addDebt: mutationAdd.mutate,
    isAddingDebt:mutationAdd.isLoading,
    editDebt: mutationEdit.mutate,
    isEditingDebt:mutationEdit.isLoading,
    deleteDebt: mutationDelete.mutate,
    filterSelectedData,
    selectedData,
  }
}

export default useDebts
