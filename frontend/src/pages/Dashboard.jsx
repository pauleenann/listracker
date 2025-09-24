import React from 'react'
import MainLayout from '../layouts/MainLayout'
import Navbar from '../components/navigation/Navbar'
import StatCards from '../features/dashboard/components/StatCards'

const Dashboard = () => {
  return (
    <MainLayout>
      <Navbar menu={"Dashboard"}/>

      <main className='px-10 overflow-x-hidden'>
        <section className='grid grid-cols-[80%_1fr]'>
          {/* cards and bar chart */}
          <div>
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
            <section>
            
            </section>
          </div>

          {/* biggest debt holder */}
          <div>
            
          </div>
        </section>
      </main>
    </MainLayout>
  )
}

export default Dashboard
