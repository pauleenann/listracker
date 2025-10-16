import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { fetchDebtor, fetchDebtorDebts } from '../services';
import useToastMutation from '../../../hooks/useToastMutation';
import { addDebt, deleteDebt, editDebt } from '../../debts/services';
import { payDebt } from '../../payments/services';
import usePagination from '../../../hooks/usePagination';
import { useDebounce } from 'use-debounce';

const useDebtor = (id) => {
    const [selectedData, setSelectedData] = useState();
    const [searchInput, setSearchInput] = useState('');
    const [debouncedSearch] = useDebounce(searchInput, 500);

    const {
        page, 
        nextPage,
        prevPage,
        limit,
    } = usePagination();

    // tanstack query
    //fetch debtor info
    const {
        isLoading: isDebtorLoading,
        isError: isDebtorError,
        data: debtor
    } = useQuery({
        queryKey: ['debtor', id],
        queryFn: ()=>fetchDebtor(id),
        keepPreviousData: true,
    });

    const {
        isLoading: isDebtsLoading,
        isError: isDebtsError,
        data
    } = useQuery({
        queryKey: ['debtor-debts', id, page, debouncedSearch],
        queryFn: ()=>fetchDebtorDebts(id, page, limit, debouncedSearch),
        keepPreviousData: true,
    });


    const initializeSelectedData = (selected)=>{
        setSelectedData({
            ...selected, 
            name: debtor?.name,
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
        ['debtor-debts']
    )

    const mutationEdit = useToastMutation(
        editDebt,
        {
            loading: 'Editing debt',
            success: 'Debt edited successfully',
            error: 'Could not edit debt',
        },
        ['debtor-debts']
    )

    const mutationDelete = useToastMutation(
        deleteDebt,
        {
            loading: 'Deleting debt',
            success: 'Debt deleted successfully',
            error: 'Could not delete debt',
        },
        ['debtor-debts']
    )

    const mutationPay = useToastMutation(
        payDebt,
        {
            loading: 'Paying debt',
            success: 'Debt paid successfully',
            error: 'Could not pay debt',
        },
        ['debtor-debts']
    )

  return {
    isDebtsError,
    isDebtsLoading,
    debts: data?.debts || [],
    isDebtorError,
    isDebtorLoading,
    debtor,
    selectedData,
    initializeSelectedData,
    addDebtorDebt: mutationAdd.mutate,
    isAdding: mutationAdd.isLoading,
    editDebtorDebt: mutationEdit.mutate,
    isEditing: mutationEdit.isLoading,
    deleteDebtorDebt: mutationDelete.mutate,
    isDeleting: mutationDelete.isLoading,
    payDebtorDebt: mutationPay.mutate,
    isPaying: mutationPay.isLoading,

    //pagination
    page,
    nextPage,
    prevPage,
    totalPages: data?.totalPages || 1,

    //search
    setSearchInput,
  }
}

export default useDebtor
