import React from 'react'
import MainLayout from '../layouts/MainLayout'
import Navbar from '../components/navigation/Navbar'
import Table from '../components/table/Table'
import SearchBar from '../components/form/SearchBar'
import Button from '../components/ui/Button'
import useModal from '../hooks/useModal.js'
import Modal from '../components/modal/Modal'
import { debtorHeader, debtorSampleData } from '../data/tableData'
import DebtorTrComponent from '../features/debtor/components/DebtorTrComponent'
import DebtorForm from '../features/debtor/components/DebtorForm'

const Debtors = () => {
  const {show, openShow, closeShow} = useModal();

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
            <Table
            header={debtorHeader}
            data={debtorSampleData}
            trComponent={DebtorTrComponent}/>
          </section>
        </main>

        {/* modal */}
        <Modal
        label={'Add Debtor'}
        show={show}
        close={closeShow}
        >
          <DebtorForm
          close={closeShow}/>
        </Modal>
    </MainLayout>
  )
}

export default Debtors
