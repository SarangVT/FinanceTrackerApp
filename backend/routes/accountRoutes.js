import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createTransaction, getAllTransactions } from "../controllers/accountController.js";
const router = express.Router();

router.get("/", authMiddleware, getAllTransactions);
router.post("/", authMiddleware, createTransaction);
export default router;