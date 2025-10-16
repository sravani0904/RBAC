import express from "express";
import auth from "../middleware/auth.js";
import {
  parentLogin,
  updatedPassword,
  updateParent,
  childAttendance,
  childResults,
  addParent,
  parentSignup,
} from "../controller/parentController.js";

const router = express.Router();

router.post("/login", parentLogin);
router.post("/updatepassword", auth, updatedPassword);
router.post("/updateprofile", auth, updateParent);
router.post("/child/attendance", auth, childAttendance);
router.post("/child/results", auth, childResults);
router.post("/add", auth, addParent);
router.post("/signup", parentSignup);

export default router;


