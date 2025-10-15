import Debtor from "../models/Debtor.js";
import Debt from "../models/Debt.js"

export const addDebt = async (req, res)=>{
    try {
        const {
            name,
            product,
            quantity,
            unitPrice,
            owedDate,
            remarks
        } = req.body;
        
        // get user id
        const userId = await Debtor.findOne({name:name});

        if (!userId) {
            return res.status(404).json({
                message: 'Debtor does not exist',
            });
        }

        await Debt.create({
            userId: userId._id,
            product: product,
            quantity: quantity,
            unitPrice: unitPrice,
            amount: unitPrice*quantity,
            remarks: remarks,
            owedDate: owedDate
        })

        return res.status(200).json({
            message: 'Debt added successfully'
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to add debt'
        })
    }
}

export const editDebt = async (req, res)=>{
    try {
        const {
            name,
            product,
            quantity,
            unitPrice,
            owedDate,
            status,
            remarks
        } = req.body;
        
        // get user id
        const userId = await Debtor.findOne({name:name});

        if (!userId) {
            return res.status(404).json({
                message: 'Debtor does not exist',
            });
        }

        await Debt.findOneAndUpdate(
            {userId: userId._id},
            {
                product: product,
                quantity: quantity,
                unitPrice: unitPrice,
                amount: unitPrice*quantity,
                status: status,
                remarks: remarks,
                owedDate: owedDate
            }
        )

        return res.status(200).json({
            message: 'Debt edited successfully'
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to add debt'
        })
    }
}

export const getDebts = async (req, res) => {
    try {
      const { page = 1, limit = 5, search = '' } = req.query;
      const skip = (page - 1) * limit;
  
      // Build match stage
      const matchStage = search
        ? { 'user.name': { $regex: search, $options: 'i' } }
        : {};
  
      const pipeline = [
        {
          $lookup: {
            from: 'debtors',  // the other collection name (in MongoDB, not the model name)         
            localField: 'userId', // field in Debt collection
            foreignField: '_id', // field in Debtor collection
            as: 'user', // output array field
          },
        },
        { $unwind: '$user' }, // Deconstruct the user array field
        { $match: matchStage },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: Number(limit) },
      ];
  
      // Run main query
      const debts = await Debt.aggregate(pipeline);
  
      // Count total (without skip/limit)
      const countPipeline = [
        {
          $lookup: {
            from: 'debtors',
            localField: 'userId',
            foreignField: '_id',
            as: 'user',
          },
        },
        { $unwind: '$user' },
        { $match: matchStage },
        { $count: 'total' },
      ];
  
      const totalResult = await Debt.aggregate(countPipeline);
      const totalDebts = totalResult[0]?.total || 0;
  
      const totalPages = Math.ceil(totalDebts / limit);
      const hasMore = page < totalPages;
  
      res.status(200).json({
        debts,
        totalPages,
        hasMore,
        message: 'Debts successfully retrieved',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to get debts' });
    }
};
  

export const getTotalStatus = async (req, res)=>{
    try {
        //fetch all debts
        const allDebts = await Debt.find({});

        // count total
        const notPaid = allDebts?.filter(f=>f.status=='not paid').length || 0;
        const pending = allDebts?.filter(f=>f.status=='pending').length || 0;
        const paid = allDebts?.filter(f=>f.status=='paid').length || 0;

        return res.status(200).json({
            status:{
                notPaid,
                pending, 
                paid
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to get status'
        })
    }
}

export const deleteDebt = async (req, res)=>{
    try {
        const {id} = req.params;
        console.log(id)

        await Debt.findByIdAndDelete(id);

        return res.status(200).json({
            message: 'Debt deleted successfully'
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to delete debts'
        })
    }
}