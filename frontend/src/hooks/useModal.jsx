import React, { useState } from 'react'

const useModal = () => {
    const [show, setShow] = useState(false);

    const openShow = ()=>{
        setShow(true)
    }

    const closeShow = ()=>{
        setShow(false)
    }

  return {
    show,
    openShow,
    closeShow
  }
}

export default useModal
