import { useQuery } from '@tanstack/react-query'
import { fetchCardStats } from '../services';

const useDashboard = () => {
    const {
        isLoading: statsLoading,
        isError: statsError,
        data: stats
    } = useQuery({
         queryKey: ['card-stats'],
         queryFn: fetchCardStats 
    });


    return {
        statsLoading,
        statsError,
        totalDebts: stats?.totalDebts||0,
        totalCollected: stats?.totalCollected||0,
        paymentsToday: stats?.paymentsToday||0,
        activeDebtors: stats?.activeDebtors||0
    }
}

export default useDashboard
