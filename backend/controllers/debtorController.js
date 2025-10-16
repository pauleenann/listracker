import mongoose from 'mongoose'
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
      const { page = 1, limit = 10, search = '' } = req.query;
      const skip = (page - 1) * limit;
  
      const pipeline = [
        // 1️⃣ Match debtor name
        { $match: { name: { $regex: search, $options: 'i' } } },
  
        // 2️⃣ Lookup debts
        {
          $lookup: {
            from: 'debts',
            localField: '_id',
            foreignField: 'userId',
            as: 'debts',
          },
        },
  
        // 3️⃣ Add total owed and status fields
        {
          $addFields: {
            totalOwed: {
              $sum: {
                $map: {
                  input: {
                    $filter: {
                      input: '$debts',
                      as: 'd',
                      cond: { $ne: ['$$d.status', 'paid'] },
                    },
                  },
                  as: 'unpaid',
                  in: '$$unpaid.amount',
                },
              },
            },
          },
        },
        {
            $addFields: {
              status: {
                $cond: [
                  { $eq: [{ $size: '$debts' }, 0] }, // if no debts
                  'no debts yet',
                  {
                    $cond: [
                      { $gt: ['$totalOwed', 0] }, // if totalOwed > 0
                      'not paid',
                      'paid'
                    ]
                  }
                ]
              }
            }
        },
  
        // 4️⃣ Lookup last payment
        {
          $lookup: {
            from: 'payments',
            let: { debtIds: '$debts._id' }, 
            pipeline: [
              { $match: { $expr: { $in: ['$debtId', '$$debtIds'] } } },
              { $sort: { paymentDate: -1 } },
              { $limit: 1 },
              { $project: { paymentDate: 1 } },
            ],
            as: 'lastPayment',
          },
        },
  
        // 5️⃣ Flatten lastPayment
        {
          $addFields: {
            lastPayment: { $arrayElemAt: ['$lastPayment.paymentDate', 0] },
          },
        },
  
        // 6️⃣ Sort + Paginate
        { $sort: { name: 1 } },
        { $skip: skip },
        { $limit: Number(limit) },
      ];
  
      const [debtors, totalCount] = await Promise.all([
        Debtor.aggregate(pipeline),
        Debtor.countDocuments({ name: { $regex: search, $options: 'i' } }),
      ]);
  
      const totalPages = Math.ceil(totalCount / limit);
  
      res.status(200).json({
        debtors,
        totalPages,
        message: 'Debtors successfully retrieved (via pipeline)',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch debtors', error });
    }
  };
  

export const getDebtorDebts = async (req, res)=>{
    try {
        const {id} = req.params;
        const {page = 1, limit = 10, search={}} = req.query;
        const skip = (page - 1) * limit;
        console.log('fetching debtor info', id)

        const totalCount = await Debt.countDocuments({
            userId: new mongoose.Types.ObjectId(id),
            product: { $regex: search, $options: 'i' }  
        });

        const debts = await Debt.find({
            userId: new mongoose.Types.ObjectId(id),
            product: { $regex: search, $options: 'i' }  
        })        
        .sort({owedDate: -1})
        .skip(skip)
        .limit(Number(limit));
        
        const totalPages = Math.ceil(totalCount / limit);

        return res.status(200).json({
          debts,
          totalPages,
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

export const getDebtor = async (req, res)=>{
  try {
    const {id} = req.params;
    const debtorInfo = await Debtor.findById(id);

    return res.status(200).json({
      debtorInfo,
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

export const deleteDebtor = async (req, res)=>{
  try {
    const {id} = req.params;
    await Debtor.findByIdAndDelete(id);
    return res.status(200).json({
        message: 'Debtor successfully deleted'
    }) 
  } catch (error) {
    console.log(error)
    return res.status(500).json({
        error: error,
        message: 'Failed to delete debtor'
    })
  }
}