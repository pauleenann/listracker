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
import PaymentForm from '../features/payments/components/PaymentForm'
import Button from '../components/button/Button'
import SearchBar from '../components/form/SearchBar'
import Pagination from '../components/pagination/Pagination'

const Debtor = () => {
    const navigate = useNavigate();

    // debtor context
    const {
        //tanstack
        isDebtsError,
        isDebtsLoading,
        debts,
        isDebtorError,
        isDebtorLoading,
        debtor,
        addDebtorDebt,
        editDebtorDebt,
        deleteDebtorDebt,
        payDebtorDebt,
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
        selectedData,
        initializeSelectedData,

        //pagination
        page,
        nextPage,
        prevPage,
        totalPages,

        //search
        setSearchInput,
    } = useDebtorContext();

    const handleClick = (debt) => {
        console.log(debt)
        if (label === 'view debt') {
            openShow('edit debt');
        } else if (label === 'edit debt') {
            editDebtorDebt(debt);
            closeShow();
        } else{
            addDebtorDebt(debt);
            closeShow();
        }
    };

    const handleDeleteDebt = () => {
        deleteDebtorDebt(selectedData._id);
        closeDeleteModal();
    }

    const handlePayment = (debt) => {
        payDebtorDebt({...debt, debtId: selectedData._id});
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

            <section className='w-full h-auto flex flex-col gap-4 justify-center'>
                {/* debtor info */}
                {isDebtorLoading&&<p><LoadingData/></p>}
                {isDebtorError&&<p>Error loading debtor info</p>}
                {debtor&&<DebtorInfo debtor={debtor}/>}

                {/* search bar and add debts */}
                <div className='flex justify-between items-center'>
                    <div className='w-100'>
                        <SearchBar
                        placeholder='Search debt by product'
                        onChange={(e)=>setSearchInput(e.target.value)}/>
                    </div>
                    
                    <div>
                        <Button
                        onClick={()=>{
                            initializeSelectedData({name: debtor?.name});
                            openShow('add debt');
                        }}>
                            Add Debt
                        </Button>
                    </div>
                </div>

                {/* debts tabl */}
                {isDebtsLoading&&<p><LoadingData/></p>}
                {isDebtsError&&<p>Error</p>}
                {!isDebtsLoading && debts && (
                    <Table
                        header={debtorDebtsHeader}
                        data={debts}
                        trComponent={DebtorDebtTrComponent}
                    />
                )}
                {/* pagina */}
                <Pagination
                page={page}
                totalPages={totalPages} 
                next={nextPage}
                prev={prevPage}/> 
                
            </section>
            
        </main>

        {/* form modal */}
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

export default Debtor
