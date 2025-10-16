import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import adminRoutes from "./routes/adminRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import facultyRoutes from "./routes/facultyRoutes.js";
import parentRoutes from "./routes/parentRoutes.js";
import { addDummyAdmin } from "./controller/adminController.js";
import communicationRoutes from "./routes/communicationRoutes.js";
import authRoutes from "./routes/authRoutes.js";
const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/api/admin", adminRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/parent", parentRoutes);
app.use("/api/comm", communicationRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5001;
const CONNECTION_URL = process.env.CONNECTION_URL || "mongodb://127.0.0.1:27017/college-erp";
app.get("/", (req, res) => {
  res.send("Hello to college erp API");
});
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    addDummyAdmin();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.log("Mongo Error", error.message));
