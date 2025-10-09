import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { fetchDebtor } from '../services';
import useToastMutation from '../../../hooks/useToastMutation';
import { deleteDebt, editDebt } from '../../debts/services';

const useDebtor = (id) => {
    const [selectedData, setSelectedData] = useState();

    // tanstack query
    const {
        isLoading,
        isError,
        data
    } = useQuery({
        queryKey: ['debtor', id],
        queryFn: ()=>fetchDebtor(id)
    });

    const initializeSelectedData = (selected)=>{
        setSelectedData({
            ...selected, 
            name: data?.debtor.name,
            owedDate: selected?.owedDate
            ? new Date(selected.owedDate).toISOString().split('T')[0]
            : ''
        })
    }

    const mutationEdit = useToastMutation(
        editDebt,
        {
            loading: 'Editing debt',
            success: 'Debt edited successfully',
            error: 'Could not edit debt',
        },
        ['debtor']
    )

    const mutationDelete = useToastMutation(
        deleteDebt,
        {
            loading: 'Deleting debt',
            success: 'Debt deleted successfully',
            error: 'Could not delete debt',
        },
        ['debtor']
    )

  return {
    isLoading,
    isError,
    data,
    selectedData,
    initializeSelectedData,
    editDebtorDebt: mutationEdit.mutate,
    isEditing: mutationEdit.isLoading,
    deleteDebtorDebt: mutationDelete.mutate,
    isDeleting: mutationDelete.isLoading,
  }
}

export default useDebtor
