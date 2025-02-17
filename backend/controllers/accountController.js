import { pool } from "../libs/database.js"

export const getAllTransactions = async (req, res) => {
    try{
        const getTransactionsQuery = {
            text: `SELECT * FROM tbltransaction WHERE user_id=$1`,
            values: [req.body.user.userId],
        }
        let transactions = await pool.query(getTransactionsQuery);
        transactions = transactions.rows;
        return res.json({
            status:"success",
            message:"All transactions are sent",
            transactions
        });
    } catch(error) {
        console.log(error);
    }
}

export const createTransaction = async (req, res)=> {
   try{
        const {userId} = req.body.user;
        const {description, mode, amount, increment, date, currentbalance} = req.body;
        if(!description || !mode || !amount || !date){
            return res.status(500).json({
                status:"failed",
                message:"Fill all required fields"
            });
        }

        const createTQuery = {
            text: `INSERT INTO tbltransaction (user_id, description, mode, amount, increment, date, currentbalance) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            values: [userId, description, mode, amount, increment, date, currentbalance],
        }

        await pool.query(createTQuery);

        return res.status(201).json({
            status:"success", message:"Transaction done",
        });

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            status:"failed",
            message:"Transaction failed",
        });

    }
}

export const editTransaction = async (req, res)=> {
    
}
