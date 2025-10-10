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
import LoadingData from '../components/loading/LoadingData'
import ConfirmationModal from '../components/modals/ConfirmationModal'

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

        // confirmation modal
        showDeleteModal,
        closeDeleteModal,
        showPayModal,
        closePayModal,

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

    const handleDeleteDebt = () => {
        deleteDebtorDebt(selectedData._id);
        closeDeleteModal();
    }

    const handlePayModal = () => {
        //call pay service here
        closePayModal();
    }

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

            <section className='w-full h-auto flex justify-center'>
                {isLoading&&<p><LoadingData/></p>}
                {isError&&<p>Error</p>}
                {data&&<div className='w-full'>
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
                </div>}    
            </section>
            
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

        {/* delete modal */}
        <ConfirmationModal
        title={'Delete Debt'}
        description={`Are you sure you want to delete #${selectedData?._id?.substring(0,10)||'this'} debt?`}
        show={showDeleteModal}
        close={closeDeleteModal}
        confirmFn={handleDeleteDebt}
        />

        {/* pay modal */}
        <ConfirmationModal
        title={'Pay Debt'}
        description={`Are you sure you want to set #${selectedData?._id?.substring(0,10)||'this'} as paid?`}
        show={showPayModal}
        close={closePayModal}
        confirmFn={handlePayModal}
        />

    
    </MainLayout>
  )
}

export default Debtor
