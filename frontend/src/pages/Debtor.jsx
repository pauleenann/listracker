import React from 'react'
import MainLayout from '../layouts/MainLayout'
import Navbar from '../components/navigation/Navbar'
import { useNavigate } from 'react-router'
import DefaultButton from '../components/button/DefaultButton'
import DebtorInfo from '../features/debtor/components/DebtorInfo'
import Table from '../components/table/Table'
import { debtorDebtsHeader } from '../data/tableData'
import DebtorDebtTrComponent from '../features/debtor/components/DebtorDebtTrComponent'
import Modal from '../components/modals/Modal'
import { useDebtorContext } from '../features/debtor/context/DebtorContext'
import DebtForm from '../features/debts/components/DebtForm'

const Debtor = () => {
    const navigate = useNavigate();

    // debtor context
    const {
        //tanstack
        isLoading,
        isError,
        data,
        editDebtorDebt,
        deleteDebtorDebt,
        isInputDisabled,
        isSearchDisabled,

        // modal
        show, 
        openShow,
        closeShow,
        label,

        //selected data
        selectedData
    } = useDebtorContext();

    const handleClick = (debt) => {
        console.log(debt)
        if (label === 'view debt') {
            openShow('edit debt');
        } else if (label === 'edit debt') {
            editDebtorDebt(debt);
            closeShow();
        }
    };

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
            <DebtForm
            handleClick={handleClick}
            selectedData={selectedData}
            close={closeShow}
            label={label}
            isInputDisabled={isInputDisabled}
            isSearchDisabled={isSearchDisabled}/>
        </Modal>
    </MainLayout>
  )
}

export default Debtor
