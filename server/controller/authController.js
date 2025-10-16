import Admin from "../models/admin.js";
import Faculty from "../models/faculty.js";
import Student from "../models/student.js";
import Parent from "../models/parent.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const ROLE_TO_MODEL = {
  admin: Admin,
  faculty: Faculty,
  student: Student,
  parent: Parent,
};

export const requestPasswordReset = async (req, res) => {
  try {
    const { email, role } = req.body;
    const Model = ROLE_TO_MODEL[role];
    if (!Model) return res.status(400).json({ message: "Invalid role" });
    const user = await Model.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    const token = jwt.sign({ id: user._id, role }, "sEcReT", { expiresIn: "15m" });
    user.resetToken = token;
    user.resetTokenExpiresAt = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();
    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ backendError: error });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const decoded = jwt.verify(token, "sEcReT");
    const Model = ROLE_TO_MODEL[decoded.role];
    const user = await Model.findById(decoded.id);
    if (!user || user.resetToken !== token || new Date() > new Date(user.resetTokenExpiresAt)) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    user.passwordUpdated = true;
    user.resetToken = undefined;
    user.resetTokenExpiresAt = undefined;
    await user.save();
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};


