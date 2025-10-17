import React from 'react'
import MainLayout from '../layouts/MainLayout'
import Navbar from '../components/navigation/Navbar'
import DebtCards from '../features/debts/components/DebtCards'
import { debtHeader } from '../data/tableData'
import DebtTrComponent from '../features/debts/components/DebtTrComponent'
import Table from '../components/table/Table'
import SearchBar from '../components/form/SearchBar'
import Button from '../components/button/Button.jsx'
import Modal from '../components/modals/Modal.jsx'
import DebtForm from '../features/debts/components/DebtForm'
import { useDebtContext } from '../features/debts/context/DebtContext.jsx'
import ConfirmationModal from '../components/modals/ConfirmationModal.jsx'
import Pagination from '../components/pagination/Pagination.jsx'
import LoadingData from '../components/loading/LoadingData.jsx'
import PaymentForm from '../features/payments/components/PaymentForm.jsx'

const Debts = () => {
  const {
    // tanstack
    isLoading, 
    isError, 
    data, 
    addDebt,
    editDebt,
    deleteDebt,
    payDebt,
    status,

    // modal
    show, 
    openShow, 
    closeShow, 
    label, 
    showDeleteModal, 
    closeDeleteModal,
    showPayModal,
    closePayModal,

    // selected data
    filterSelectedData,
    selectedData,

    // pagination
    page,
    nextPage, 
    prevPage,
    totalPages,

    //search input
    setSearchInput,
    isInputDisabled,
    isSearchDisabled
  } = useDebtContext();

  const handleClick = (debt) => {
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
    closeDeleteModal();
  }

  const handlePayment = (debt) => {
    payDebt({...debt, debtId: selectedData._id});
    closePayModal();
  }

  return (
    <MainLayout>
        <Navbar menu={"Debts"}/>

        <main className='px-10 w-full h-full flex flex-col gap-3'>
          {/* cards */}
          <section className='flex items-center gap-3'>
            <DebtCards
            label='Debts not paid'
            value={status?.notPaid}
            color='bg-theme-gray'/>
            {/* <DebtCards
            label='Debts pending'
            value={status?.pending}
            color='bg-gray-500'/> */}
            <DebtCards
            label='Debts paid'
            value={status?.paid}
            color='bg-theme-blue'/>  
          </section>

          {/* search and other buttons */}
          <section className='flex justify-between items-center mt-8'>
            <div className='w-100'>
              <SearchBar
              placeholder={'Search by debtor name'}
              onChange={(e)=>setSearchInput(e.target.value)}/>
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
            {isLoading&&<LoadingData/>}
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
          page={page}
          totalPages={totalPages}
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
        handleClick={handleClick}
        selectedData={selectedData}
        close={closeShow}
        label={label}
        isInputDisabled={isInputDisabled}
        isSearchDisabled={isSearchDisabled}/>
      </Modal>

      {/* delete modal */}
      <ConfirmationModal
      title={'Delete Debt'}
      description={`Are you sure you want to delete #${selectedData?._id?.substring(0,10)||'this'} debt?`}
      show={showDeleteModal}
      close={closeDeleteModal}
      confirmFn={handleDeleteDebt}
      />

      {/* pay modal */}
      <Modal
      label={'Pay Debt'}
      show={showPayModal}
      close={closePayModal}>
        <PaymentForm
        handleClick={handlePayment}
        close={closePayModal}/>
      </Modal>
    </MainLayout>
  )
}

export default Debts
