import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import useToastMutation from '../../../hooks/useToastMutation'
import { createDebtor, deleteDebtor, fetchDebtors } from '../services'
import usePagination from '../../../hooks/usePagination'
import { useDebounce } from 'use-debounce'

const useDebtors = () => {
    const [searchInput, setSearchInput] = useState('');

    //destructure debounce array
    const [debounceSearch] = useDebounce(searchInput, 500);

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
        queryKey: ['debtors', page, debounceSearch],
        queryFn: ()=>fetchDebtors(page, limit, debounceSearch),
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

    const mutationDelete = useToastMutation(
        deleteDebtor,
        {
            loading: 'Deleting debtor',
            success: 'Debtor deleted successfully',
            error: 'Could not delete debt',
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
    deleteDebtor: mutationDelete.mutate,
    isDeleting: mutationDelete.isLoading,

    //pagination
    totalPages: data?.totalPages,
    nextPage,
    prevPage,
    page,
    
    //search
    searchInput,
    setSearchInput
  }
}

export default useDebtors
