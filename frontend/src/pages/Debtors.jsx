import React from 'react'
import MainLayout from '../layouts/MainLayout'
import Navbar from '../components/navigation/Navbar'
import Table from '../components/table/Table'
import SearchBar from '../components/form/SearchBar'
import Button from '../components/button/Button'
import Modal from '../components/modals/Modal'
import { debtorHeader, debtorSampleData } from '../data/tableData'
import DebtorTrComponent from '../features/debtor/components/DebtorTrComponent'
import DebtorForm from '../features/debtor/components/DebtorForm'
import { useDebtorsContext } from '../features/debtor/context/DebtorsContext'
import LoadingData from '../components/loading/LoadingData'

const Debtors = () => {
  const {
    show,
    openShow,
    closeShow,
    isLoading,
    isError,
    addDebtor,
    data
  } = useDebtorsContext();

  const handleAddDebtor = (debtor)=>{
    addDebtor(debtor)
    closeShow();
  }

  return (
    <MainLayout>
        <Navbar menu={"Debtors"}/>

        <main className='px-10 w-full h-full flex flex-col gap-3'>
          {/* search and other buttons */}
          <section className='flex justify-between items-center'>
            <div className='w-100'>
              <SearchBar/>
            </div>
            <div>
              <Button
              type={'text'}
              onClick={openShow}>
                <div className='flex items-center gap-2'>
                  <i className="fa-solid fa-plus text-sm"></i>
                  <span>Add debtor</span>
                </div>
              </Button>
            </div>
          </section>

          {/* table */}
          <section className='mt-3'>
            {isLoading&&<LoadingData/>}
            {isError&&<p>Error</p>}
            {data&&<Table
            header={debtorHeader}
            data={data}
            trComponent={DebtorTrComponent}/>}
            
          </section>
        </main>

        {/* modal */}
        <Modal
        label={'Add Debtor'}
        show={show}
        close={closeShow}
        >
          <DebtorForm
          handleAddDebtor={handleAddDebtor}/>
        </Modal>
    </MainLayout>
  )
}

export default Debtors
