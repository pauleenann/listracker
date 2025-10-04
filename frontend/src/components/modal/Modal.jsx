import React from 'react'
import ReactDOM from 'react-dom'
import DefaultButton from '../ui/DefaultButton'

const Modal = ({
    label, 
    show = false,
    close,
    children
}) => {
  return show && ReactDOM.createPortal(
    <div className='absolute inset-0 z-5'>
      <div 
      onClick={close}
      className='bg-gray-300/50 w-full h-full flex items-center justify-center'>
        {/* stops bubbling up the DOM, therefore not executing the onClick event on the parent element */}
        <article 
        onClick={(e)=>e.stopPropagation()} 
        className='max-h-130 w-130 bg-white rounded-xl p-8 flex flex-col justify-between'>
            <header className='flex items-center justify-between text-theme-gray'>
                <span className='text-2xl font-semibold capitalize'>{label}</span>
                <div>
                    <DefaultButton
                    onClick={close}>
                        <i className="fa-solid fa-xmark"></i>   
                    </DefaultButton>
                </div>  
            </header>

            <main className='overflow-y-scroll scrollbar-none'>
              {children}  
            </main>
        </article>
      </div>
    </div>,
    document.getElementById('modal-root')
  )
}

export default Modal
