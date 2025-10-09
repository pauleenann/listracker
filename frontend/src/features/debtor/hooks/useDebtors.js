import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useToastMutation from '../../../hooks/useToastMutation'
import { createDebtor, fetchDebtors } from '../services'

const useDebtors = () => {
    const {
        isLoading,
        isError,
        data
    } = useQuery({
        queryKey: ['debtors'],
        queryFn: fetchDebtors
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
    isLoading,
    isError,
    data,
    isAdding: mutationAdd.isLoading,
    addDebtor: mutationAdd.mutate
  }
}

export default useDebtors
