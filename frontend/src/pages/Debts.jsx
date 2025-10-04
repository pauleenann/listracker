import React from 'react'
import MainLayout from '../layouts/MainLayout'
import Navbar from '../components/navigation/Navbar'
import DebtCards from '../features/debts/components/DebtCards'
import { debtHeader } from '../data/tableData'
import DebtTrComponent from '../features/debts/components/DebtTrComponent'
import Table from '../components/table/Table'
import SearchBar from '../components/form/SearchBar'
import Button from '../components/ui/Button'
import Modal from '../components/modal/Modal'
import DebtForm from '../features/debts/components/DebtForm'
import { useDebtContext } from '../features/debts/context/DebtContext.jsx'

const Debts = () => {
  const {
    isLoading, 
    isError, 
    data, 
    show, 
    openShow, 
    closeShow, 
    label, 
    filterSelectedData
  } = useDebtContext();

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
        </main>

      {/* modal */}
      <Modal
      label={label}
      show={show}
      close={closeShow}
      >
        <DebtForm/>
      </Modal>
    </MainLayout>
  )
}

export default Debts
