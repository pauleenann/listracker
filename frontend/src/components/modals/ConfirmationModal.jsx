import React from 'react'
import ReactDOM from 'react-dom'
import DefaultButton from '../button/DefaultButton'
import Button from '../button/Button'

const ConfirmationModal = ({
    title = 'This is the confirmation modal',
    description = 'This is confirmation modal description',
    show = false,
    close = ()=>{},
    confirmFn = ()=>{}
}) => {
  return show && ReactDOM.createPortal(
    <div className='absolute inset-0 z-5'>
      <div 
      onClick={close}
      className='bg-gray-300/50 w-full h-full flex items-center justify-center'>
        <article 
        onClick={(e)=>e.stopPropagation()} 
        className='max-h-100 w-100 bg-white rounded-xl p-8 flex flex-col justify-between items-center text-center gap-2'>
            <h1 className='text-xl font-semibold'>{title}</h1>
            <p className='text text-gray-500'>{description}</p>
            <div className='flex mt-4'>
                <div>
                    <DefaultButton
                    onClick={close}>
                        Cancel
                    </DefaultButton>
                </div>
                <div>
                    <Button
                    onClick={()=>confirmFn()}>
                        Confirm
                    </Button>
                </div>
            </div>
        </article>
      </div>
    </div>,
    document.getElementById('modal-root')
  )
}

export default ConfirmationModal
