import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react'
import { addDebt, deleteDebt, editDebt, fetchDebt, fetchTotalStatus } from '../services';
import useToastMutation from '../../../hooks/useToastMutation';
import usePagination from '../../../hooks/usePagination';
import {useDebounce} from 'use-debounce'

const useDebts = () => {
    const [selectedData, setSelectedData] = useState(null);

    const [searchInput, setSearchInput] = useState('');
    const [debounceSearch] = useDebounce(searchInput, 500)

    useEffect(()=>{
        console.log(debounceSearch)
    },[debounceSearch])

    const {
        page,
        nextPage,
        prevPage,
        limit,
        setPage
    } = usePagination();

    const {
        data: status,
    } = useQuery({
        queryKey:['status'],
        queryFn: fetchTotalStatus,
    });

    const {
        isLoading,
        isError,
        data,
    } = useQuery({
        queryKey:['debts', page, debounceSearch],
        queryFn: ()=>fetchDebt(page, limit, debounceSearch),
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
            const selected = data.debts.find(f => f._id === id);

            if(!selected) return;
            
            setSelectedData({
                ...selected,
                name: selected?.userId?.name,
                // convert dueDate to YYYY-MM-DD
                owedDate: selected?.owedDate
                ? new Date(selected.owedDate).toISOString().split('T')[0]
                : ''
            })  
        }
    }

    useEffect(() => {
        // go to previous page if you deleted all data in current page
        if (!isLoading && data?.debts?.length === 0 && page > 1) {
          setPage(page - 1);
        }
    }, [data]);
      

  return {
    //tanstack query
    isLoading,
    isError,
    data: data?.debts,
    totalPages: data?.totalPages,
    addDebt: mutationAdd.mutate,
    isAddingDebt:mutationAdd.isLoading,
    editDebt: mutationEdit.mutate,
    isEditingDebt:mutationEdit.isLoading,
    deleteDebt: mutationDelete.mutate,
    status, 

    //selected data
    filterSelectedData,
    selectedData,

    //pagination
    page,
    nextPage,
    prevPage,

    //search input
    setSearchInput
  }
}

export default useDebts
