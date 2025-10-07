import React, { useEffect, useState } from 'react'

const usePagination = () => {
    const [page, setPage] = useState(1);
    const limit = 10;

    const nextPage = ()=>{
        setPage(prev=>prev+1)
    }

    const prevPage = ()=>{
        if(page>1){
            setPage(page-1)
        } 
    }

    useEffect(()=>{
        console.log(page)
    },[page])

  return {
    page, 
    nextPage,
    prevPage,
    limit
  }
}

export default usePagination
