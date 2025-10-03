import React from 'react'
import useDebts from '../hooks/useDebts'
import Debts from '../../../pages/Debts';

const DebtContainer = () => {
    const {isLoading, isError, data, addDebt, isAddingDebt} = useDebts();

    return (
        <Debts
        isLoading={isLoading}
        isError={isError}
        data={data}
        addDebt={addDebt}
        isAddingDebt={isAddingDebt}
        />
    )
}

export default DebtContainer
