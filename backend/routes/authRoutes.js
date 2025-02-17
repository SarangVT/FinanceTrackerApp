import express from "express";
import { signinUser, signupUser } from "../controllers/authController.js";
const router = express.Router();
router.post("/signup", signupUser);
router.post("/login", signinUser);
export default router;