import React, { useState } from 'react'

const useConfirmationModal = () => {
    const [showConfirmation, setShowConfirmation] = useState(false);
   
    const openConfirmation = ()=>{
        setShowConfirmation(true);
       
    }

    const closeConfirmation = ()=>{
        setShowConfirmation(false)
    }

  return {
    showConfirmation,
    openConfirmation,
    closeConfirmation
  }
}

export default useConfirmationModal
