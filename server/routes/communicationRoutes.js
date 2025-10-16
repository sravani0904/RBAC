import express from "express";
import auth from "../middleware/auth.js";
import { sendFeedback, listFeedback, sendMessage, listMessages } from "../controller/communicationController.js";

const router = express.Router();

router.post("/feedback/send", auth, sendFeedback);
router.get("/feedback", auth, listFeedback);
router.post("/message/send", auth, sendMessage);
router.get("/message", auth, listMessages);

export default router;


