import React from 'react'
import MainLayout from '../layouts/MainLayout'
import Navbar from '../components/navigation/Navbar'
import BiggestDebtHolderItem from '../features/dashboard/components/BiggestDebtHolderItem'
import Table from '../components/table/Table'
import { dashHeader, dashSampleData } from '../data/tableData'
import TrComponent from '../features/dashboard/components/TrComponent'
import Cards from '../components/cards/Cards'
import { BarChart } from '../components/charts/Barchart'
import { DonutChart } from '../components/charts/DonutChart'
import StatCards from '../features/dashboard/components/StatCards'

const Dashboard = () => {
  return (
    <MainLayout>
      <Navbar menu={"Dashboard"}/>

      <main className='px-10 w-full h-full flex flex-col gap-3'>
        {/* cards, rank, barchart */}
        <section className='grid grid-cols-[78%_1fr] gap-3'>
          <div className='flex flex-col gap-3'>
            <section className='grid grid-cols-4 gap-3'>
              <StatCards 
              label={'total debts'}
              value={`PHP 2,000`}/>
              <StatCards 
              label={'total collected'}
              value={`PHP 2,000`}/>
              <StatCards
              label={'payments today'}
              value={`PHP 2,000`}/>
              <StatCards 
              label={'active debtors'}
              value={`23`}/>
            </section>
            <Cards
            label={'Outstanding vs Collected'}>
              <BarChart/>
            </Cards>
          </div>

          <div>
            <Cards
            label={'Biggest Debt Holder'}>
              <BiggestDebtHolderItem/>
            </Cards>
          </div>
        </section> 

        {/* pie chart and table */}
        <section className='grid grid-cols-[40%_1fr] gap-3'>
          <Cards
          label={'Most Owed Products'}>
            <DonutChart/>
          </Cards>

          <Cards
          label={'Debts Today'}>
            <Table
            header={dashHeader}
            data={dashSampleData}
            trComponent={TrComponent}/>
          </Cards>
        </section>
      </main>
    </MainLayout>
  )
}

export default Dashboard
