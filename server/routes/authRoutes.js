import express from "express";
import { requestPasswordReset, resetPassword } from "../controller/authController.js";

const router = express.Router();

router.post("/request-reset", requestPasswordReset);
router.post("/reset", resetPassword);

export default router;


