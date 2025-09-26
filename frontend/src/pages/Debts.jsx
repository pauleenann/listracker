import React from 'react'
import MainLayout from '../layouts/MainLayout'
import Navbar from '../components/navigation/Navbar'
import DebtCards from '../features/debts/components/DebtCards'
import { debtHeader, debtSampleData } from '../data/tableData'
import DebtTrComponent from '../features/debts/components/DebtTrComponent'
import Table from '../components/table/Table'

const Debts = () => {
  return (
    <MainLayout>
        <Navbar menu={"Debts"}/>

        <main className='px-10 w-full h-full flex flex-col gap-3'>
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
          <section className='mt-5'>
            <Table
            header={debtHeader}
            data={debtSampleData}
            trComponent={DebtTrComponent}/>
          </section>
      </main>
    </MainLayout>
  )
}

export default Debts
