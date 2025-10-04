import React, { useState } from 'react'

const useModal = () => {
    const [show, setShow] = useState(false);
    const [label, setLabel] = useState('')

    const openShow = (text)=>{
        setShow(true);
        setLabel(text)
    }

    const closeShow = ()=>{
        setShow(false)
    }

  return {
    show,
    openShow,
    closeShow,
    label
  }
}

export default useModal
