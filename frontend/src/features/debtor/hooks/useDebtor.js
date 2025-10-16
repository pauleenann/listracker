import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { fetchDebtor } from '../services';
import useToastMutation from '../../../hooks/useToastMutation';
import { addDebt, deleteDebt, editDebt } from '../../debts/services';
import { payDebt } from '../../payments/services';

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

    const mutationAdd = useToastMutation(
        addDebt,
        {
            loading: 'Adding debt',
            success: 'Debt added successfully',
            error: 'Could not add debt',
        },
        ['debtor']
    )

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

    const mutationPay = useToastMutation(
        payDebt,
        {
            loading: 'Paying debt',
            success: 'Debt paid successfully',
            error: 'Could not pay debt',
        },
        ['debtor']
    )

  return {
    isLoading,
    isError,
    debts: data?.debts || [],
    debtor: data?.debtor || {},
    selectedData,
    initializeSelectedData,
    addDebtorDebt: mutationAdd.mutate,
    isAdding: mutationAdd.isLoading,
    editDebtorDebt: mutationEdit.mutate,
    isEditing: mutationEdit.isLoading,
    deleteDebtorDebt: mutationDelete.mutate,
    isDeleting: mutationDelete.isLoading,
    payDebtorDebt: mutationPay.mutate,
    isPaying: mutationPay.isLoading
  }
}

export default useDebtor
