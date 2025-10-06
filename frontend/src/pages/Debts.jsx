import React from 'react'
import MainLayout from '../layouts/MainLayout'
import Navbar from '../components/navigation/Navbar'
import DebtCards from '../features/debts/components/DebtCards'
import { debtHeader } from '../data/tableData'
import DebtTrComponent from '../features/debts/components/DebtTrComponent'
import Table from '../components/table/Table'
import SearchBar from '../components/form/SearchBar'
import Button from '../components/ui/Button'
import Modal from '../components/modals/Modal.jsx'
import DebtForm from '../features/debts/components/DebtForm'
import { useDebtContext } from '../features/debts/context/DebtContext.jsx'
import ConfirmationModal from '../components/modals/ConfirmationModal.jsx'
import Pagination from '../components/pagination/Pagination.jsx'
import { fetchDebt } from '../features/debts/services/index.js'

const Debts = () => {
  const {
    isLoading, 
    isError, 
    data, 
    addDebt,
    editDebt,
    deleteDebt,
    show, 
    openShow, 
    closeShow, 
    showConfirmation,
    closeConfirmation,
    label, 
    filterSelectedData,
    selectedData,
    nextPage, 
    prevPage,
  } = useDebtContext();

  const handleAddDebt = (debt) => {
    console.log(debt)
    if (label === 'view debt') {
        openShow('edit debt');
    } else if (label === 'edit debt') {
        editDebt(debt);
        closeShow();
    } else {
        addDebt(debt);
        closeShow();
    }
  };

  const handleDeleteDebt = ()=>{
    deleteDebt(selectedData._id)
    closeConfirmation();
  }

  return (
    <MainLayout>
        <Navbar menu={"Debts"}/>

        <main className='px-10 w-full h-full flex flex-col gap-3'>
          {/* cards */}
          <section className='flex items-center gap-3'>
            <DebtCards
            label='Debts not paid'
            value={10}
            color='bg-theme-gray'/>
            <DebtCards
            label='Debts pending'
            value={10}
            color='bg-gray-500'/>
            <DebtCards
            label='Debts paid'
            value={10}
            color='bg-theme-blue'/>  
          </section>

          {/* search and other buttons */}
          <section className='flex justify-between items-center mt-8'>
            <div className='w-100'>
              <SearchBar/>
            </div>
            <div>
              <Button
              type={'text'}
              onClick={()=>{
                filterSelectedData(null)
                openShow('add debt')
              }}>
                <div className='flex items-center gap-2'>
                  <i className="fa-solid fa-plus text-sm"></i>
                  <span>Add debt</span>
                </div>
              </Button>
            </div>
          </section>

          {/* table */}
          <section className='mt-3'> 
            {isLoading&&<p>Loading</p>}
            {isError&&<p>Error</p>}
            {data&&
            <Table
            header={debtHeader}
            data={data}
            trComponent={DebtTrComponent}/>
            }
          </section>

          {/* pagination */}
          <Pagination
          next={nextPage}
          prev={prevPage}/>
        </main>

      {/* modal */}
      <Modal
      label={label}
      show={show}
      close={closeShow}
      >
        <DebtForm
        handleAddDebt={handleAddDebt}/>
      </Modal>

      {/* confirmation modal */}
      <ConfirmationModal
      title={'Delete Debt'}
      description={`Are you sure you want to delete #${selectedData?._id?.substring(0,10)||'this'} debt?`}
      show={showConfirmation}
      close={closeConfirmation}
      confirmFn={handleDeleteDebt}
      />
    </MainLayout>
  )
}

export default Debts
