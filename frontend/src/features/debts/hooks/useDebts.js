import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react'
import { addDebt, deleteDebt, editDebt, fetchDebt } from '../services';
import useToastMutation from '../../../hooks/useToastMutation';
import usePagination from '../../../hooks/usePagination';

const useDebts = () => {
    const [selectedData, setSelectedData] = useState(null);
    const {
        page,
        nextPage,
        prevPage,
        limit
    } = usePagination();

    const {
        isLoading,
        isError,
        data,
    } = useQuery({
        queryKey:['debts', page],
        queryFn: ()=>fetchDebt(page, limit),
        keepPreviousData: true // avoid rendering blank page when fetching next data
    });
        
    const mutationAdd = useToastMutation(
        addDebt,
        {
            loading: 'Adding debt',
            success: 'Debt added successfully',
            error: 'Could not add debt',
        },
        ['debts']
    )

    const mutationEdit = useToastMutation(
        editDebt,
        {
            loading: 'Editing debt',
            success: 'Debt edited successfully',
            error: 'Could not edit debt',
        },
        ['debts']
    )

    const mutationDelete = useToastMutation(
        deleteDebt,
        {
            loading: 'Deleting debt',
            success: 'Debt deleted successfully',
            error: 'Could not delete debt',
        },
        ['debts']
    )

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
    data: data?.debts,
    totalPages: data?.totalPages,
    addDebt: mutationAdd.mutate,
    isAddingDebt:mutationAdd.isLoading,
    editDebt: mutationEdit.mutate,
    isEditingDebt:mutationEdit.isLoading,
    deleteDebt: mutationDelete.mutate,
    filterSelectedData,
    selectedData,
    page,
    nextPage,
    prevPage
  }
}

export default useDebts
