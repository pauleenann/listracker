import React from 'react'
import DefaultButton from '../ui/DefaultButton'

const Pagination = ({
  next,
  prev
}) => {
  return (
    <footer
    className='flex justify-end'>
      <div
      className='flex items-center'>
        <DefaultButton
        onClick={prev}>
            Prev
        </DefaultButton>
        <DefaultButton
        onClick={next}>
            Next
        </DefaultButton>
      </div>
    </footer>
  )
}

export default Pagination
