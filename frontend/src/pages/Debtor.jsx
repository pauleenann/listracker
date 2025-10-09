import React from 'react'
import MainLayout from '../layouts/MainLayout'
import Navbar from '../components/navigation/Navbar'
import { useNavigate, useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { fetchDebtor } from '../features/debtor/services'
import LoadingData from '../components/loading/LoadingData'
import DefaultButton from '../components/button/DefaultButton'
import DebtorInfo from '../features/debtor/components/DebtorInfo'
import Table from '../components/table/Table'
import { debtorDebtsHeader } from '../data/tableData'
import DebtorDebtTrComponent from '../features/debtor/components/DebtorDebtTrComponent'
import Modal from '../components/modals/Modal'
import { useDebtorContext } from '../features/debtor/context/DebtorContext'
import DebtForm from '../features/debts/components/DebtForm'

const Debtor = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    // tanstack query
    const {
        isLoading,
        isError,
        data
    } = useQuery({
        queryKey: ['debtor', id],
        queryFn: ()=>fetchDebtor(id)
    });

    // debtor context
    const {
        show, 
        openShow,
        closeShow,
        label
    } = useDebtorContext();


  return (
    <MainLayout>
        <Navbar menu={'Debtor'}/>

        <main className='px-10 w-full h-full flex flex-col items-start'>
            {/* back */}
            <div>
                <DefaultButton
                onClick={()=>navigate('/debtors')}>
                    Back
                </DefaultButton>    
            </div>

            {isLoading&&<p>Loading</p>}
            {isError&&<p>Error</p>}
            {data&&<section className='w-full'>
                {/* debtor info */}
                <DebtorInfo
                debtor={data.debtor}/>

                {/* list of debts */}
                <div className='mt-4'>
                    <Table
                    header={debtorDebtsHeader}
                    data={data.debts}
                    trComponent={DebtorDebtTrComponent}/>    
                </div>
            </section>}
        </main>

        {/* modal */}
        <Modal
        label={label}
        show={show}
        close={closeShow}>
            <DebtForm/>
        </Modal>
    </MainLayout>
  )
}

export default Debtor
