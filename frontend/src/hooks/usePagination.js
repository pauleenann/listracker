import React, { useEffect, useState } from 'react'

const usePagination = () => {
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(null);
    const limit = 5;

    const nextPage = ()=>{
        setPage(page+1)
        
    }

    const prevPage = ()=>{
        setPage(page-1)
    }

    const initializeTotalPage = (totalData)=>{
        setTotalPage(Math.ceil(totalData/limit))
    }

    useEffect(()=>{
        console.log('page: ', page)
        console.log('total page: ', totalPage)
    }, [page, totalPage])

  return {
    page, 
    nextPage,
    prevPage,
    initializeTotalPage,
    limit
  }
}

export default usePagination
