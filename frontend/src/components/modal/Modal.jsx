import React from 'react'
import ReactDOM from 'react-dom'
import Button from '../ui/Button'
import DefaultButton from '../ui/DefaultButton'

const Modal = ({
    label, 
    show = false,
    close,
    children
}) => {
  return show && ReactDOM.createPortal(
    <div className='absolute inset-0'>
      <div 
      onClick={close}
      className='bg-gray-300/50 w-full h-full flex items-center justify-center'>
        <article 
        onClick={(e)=>e.stopPropagation()}
        className='min-h-100 min-w-120 bg-white rounded-xl p-8 flex flex-col justify-between'>
            <header className='flex items-center justify-between text-theme-gray'>
                <span className='text-2xl font-semibold'>{label}</span>
                <div>
                    <DefaultButton
                    onClick={close}>
                        <i className="fa-solid fa-xmark"></i>   
                    </DefaultButton>
                </div>
            </header>

            <main>
              {children}  
            </main>

            <footer className='flex items-center justify-end gap-2'>
                <div>
                    <DefaultButton>
                        Cancel
                    </DefaultButton>
                </div>
                <div>
                    <Button>
                        Save
                    </Button>    
                </div>
            </footer>
        </article>
      </div>
    </div>,
    document.getElementById('modal-root')
  )
}

export default Modal
