import Debtor from '../models/Debtor.js' 
import Debt from '../models/Debt.js'
import Payment from '../models/Payment.js'

export const addDebtor = async (req,res)=>{
    try {
        const {
            name,
            contactNumber
        }= req.body;

        //check if debtor exists
        const debtor = await Debtor.findOne({
            name: { $regex: `^${name}$`, $options: 'i' }
        });

        //throw error id debtor is not null
        if(debtor){
            return res.status(409).json({
                message: 'Debtor already exists',
            });
        }else{
            await Debtor.create({
                name: name,
                contactNumber: contactNumber
            })
        }

        return res.status(200).json({
            message: 'Debtor added successfully'
        })

        console.log(name, contactNumber)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: error,
            message: 'Failed to add debtor'
        })
    }
}

export const getDebtors = async (req, res) => {
    try {
      const debtors = await Debtor.find({}).sort({name: 1});
  
      const results = await Promise.all(
        debtors.map(async (debtor) => {
          // Get ALL debts
          const debts = await Debt.find({ userId: debtor._id }, { amount: 1, status: 1 });
          console.log('All debts for', debtor.name, debtor._id, debts);
  
          // Compute total owed only from unpaid debts
          const unpaidDebts = debts.filter((d) => d.status != 'paid');
          console.log('Unpaid debts for', debtor.name, unpaidDebts);
          const totalOwed = unpaidDebts.length > 0 ? unpaidDebts.reduce((acc, d) => acc + d.amount, 0) : 0;
          console.log('Total owed for', debtor.name, totalOwed);
  
          // Get all debt IDs (for payment history)
          const debtIds = debts.map((d) => d._id);
  
          // Get latest payment if any debts exist
          let lastPayment = null;
          if (debtIds.length > 0) {
            lastPayment = await Payment.findOne({
              debtId: { $in: debtIds },
            }).sort({ paymentDate: -1 });
          }
  
          return {
            ...debtor.toObject(),
            totalOwed,
            status: totalOwed > 0 ? 'unpaid' : 'paid',
            lastPayment: lastPayment?.paymentDate || null,
          };
        })
      );
  
      return res.status(200).json({
        debtors: results,
        message: 'Debtors successfully retrieved',
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error,
        message: 'Failed to fetch debtors',
      });
    }
  };
  
  

export const getDebtor = async (req, res)=>{
    try {
        const {id} = req.params;
        console.log('params', id)

        const debtor = await Debtor.findById(id)
        const debts = await Debt.find({userId: id});

        return res.status(200).json({
            debtor,
            debts,
            message: 'Debtor successfully retrieved'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: error,
            message: 'Failed to fetch debtor'
        })
    }
}

export const getDebtorSuggestion = async (req,res)=>{
    try {
        const {debtor} = req.query;
        
        const debtors = await Debtor.find(
            {name: { $regex: `^${debtor}`, $options: 'i' }},
            {name: 1}
        )

        console.log(debtors)
        return res.status(200).json({
            debtors,
            message: 'Suggestions retrieved'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: error,
            message: 'Failed to retrieve suggestions'
        })
    }
}