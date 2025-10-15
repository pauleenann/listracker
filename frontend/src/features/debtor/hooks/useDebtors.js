import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useToastMutation from '../../../hooks/useToastMutation'
import { createDebtor, fetchDebtors } from '../services'
import usePagination from '../../../hooks/usePagination'

const useDebtors = () => {
    const {
        page, 
        limit,
        nextPage,
        prevPage
    } = usePagination();

    const {
        isLoading,
        isError,
        data
    } = useQuery({
        queryKey: ['debtors', page],
        queryFn: ()=>fetchDebtors(page, limit),
    })

    const mutationAdd = useToastMutation(
        createDebtor,
        {
            loading: 'Creating debtor',
            success: 'Debtor created successfully',
            error: 'Could not create debt',
        },
        ['debtor']
    )

  return {
    //tanstack
    isLoading,
    isError,
    data: data?.debtors,
    isAdding: mutationAdd.isLoading,
    addDebtor: mutationAdd.mutate,

    //pagination
    totalPages: data?.totalPages,
    nextPage,
    prevPage,
    page,
    
  }
}

export default useDebtors
