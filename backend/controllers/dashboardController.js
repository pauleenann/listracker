import Debt from "../models/Debt.js";
import Payment from "../models/Payment.js";

export const fetchCardStats = async (req, res)=>{
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        //fetch total debts and total collected 
        const totalDebtsCollected = await Debt.aggregate([
            {
              $group: {
                _id: null,
                totalDebts: {
                  $sum: {
                    $cond: [{ $eq: ['$status', 'not paid'] }, '$amount', 0]
                  }
                },
                totalCollected: {
                  $sum: {
                    $cond: [{ $eq: ['$status', 'paid'] }, '$amount', 0]
                  }
                }
              }
            }
        ]);
          

        const totalToday = await Payment.aggregate([
            {$match: {paymentDate: {
                $gte: startOfDay,
                $lte: endOfDay
            }}},
            {
                $lookup: {
                    from: 'debts',
                    localField: 'debtId',
                    foreignField: '_id',
                    as: 'debts'
                }
            },
            { $unwind: '$debts' }, 
            {
                $group:{
                    _id: null,
                    totalToday: {
                        $sum: '$debts.amount'
                    }
                }
            }
        ])

        const totalActive = await Debt.aggregate([
            {$match: {status: 'not paid'}},
            {
                $group: {
                    _id: '$userId'
                }
            },
            {$count: 'activeDebtors'}
        ])

        console.log('totalDebtsCollected: ',totalDebtsCollected);
        console.log('payments: ', totalToday)
        console.log('active: ', totalActive);
        return res.status(200).json({
            totalDebts: totalDebtsCollected.length>0?totalDebtsCollected[0].totalDebts:0,
            totalCollected: totalDebtsCollected.length>0?totalDebtsCollected[0].totalCollected:0,
            paymentsToday: totalToday.length>0?totalToday[0].totalToday:0,
            activeDebtors: totalActive.length>0?totalActive[0].activeDebtors:0,
            message: 'Stats retrieved successfully'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to fetch card stats'
        })
    }
}