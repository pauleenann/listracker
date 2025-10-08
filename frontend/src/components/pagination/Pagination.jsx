import React from 'react'
import DefaultButton from '../button/DefaultButton'

const Pagination = ({
  page,
  totalPages,
  next,
  prev
}) => {

  return (
    <footer
    className='flex justify-end'>
      <div
      className='flex items-center gap-1'>
        <DefaultButton
        onClick={prev}
        disabled={page==1}>
            Prev
        
        </DefaultButton>
        <DefaultButton
        onClick={next}
        disabled={page==totalPages}>
            Next
        </DefaultButton>
      </div>
    </footer>
  )
}

export default Pagination
