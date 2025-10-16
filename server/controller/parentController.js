import Parent from "../models/parent.js";
import Student from "../models/student.js";
import Attendence from "../models/attendance.js";
import Marks from "../models/marks.js";
import Test from "../models/test.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const parentLogin = async (req, res) => {
  const { username, password } = req.body;
  const errors = { usernameError: String, passwordError: String };
  try {
    const identifier = username;
    const existingParent = await Parent.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });
    if (!existingParent) {
      errors.usernameError = "Parent doesn't exist.";
      return res.status(404).json(errors);
    }
    const isPasswordCorrect = await bcrypt.compare(password, existingParent.password);
    if (!isPasswordCorrect) {
      errors.passwordError = "Invalid Credentials";
      return res.status(404).json(errors);
    }

    const token = jwt.sign(
      {
        email: existingParent.email,
        id: existingParent._id,
        role: "parent",
      },
      "sEcReT",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingParent, token: token });
  } catch (error) {
    console.log(error);
  }
};

export const updatedPassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword, email } = req.body;
    const errors = { mismatchError: String };
    if (newPassword !== confirmPassword) {
      errors.mismatchError = "Your password and confirmation password do not match";
      return res.status(400).json(errors);
    }

    const parent = await Parent.findOne({ email });
    let hashedPassword;
    hashedPassword = await bcrypt.hash(newPassword, 10);
    parent.password = hashedPassword;
    await parent.save();
    if (parent.passwordUpdated === false) {
      parent.passwordUpdated = true;
      await parent.save();
    }

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
      response: parent,
    });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

export const updateParent = async (req, res) => {
  try {
    const { name, contactNumber, avatar, email, address } = req.body;
    const updatedParent = await Parent.findOne({ email });
    if (name) {
      updatedParent.name = name;
      await updatedParent.save();
    }
    if (contactNumber) {
      updatedParent.contactNumber = contactNumber;
      await updatedParent.save();
    }
    if (address) {
      updatedParent.address = address;
      await updatedParent.save();
    }
    if (avatar) {
      updatedParent.avatar = avatar;
      await updatedParent.save();
    }
    res.status(200).json(updatedParent);
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

export const childAttendance = async (req, res) => {
  try {
    const { studentId } = req.body;
    const attendence = await Attendence.find({ student: studentId }).populate("subject");
    if (!attendence) {
      return res.status(404).json({ message: "Attendance not found" });
    }
    res.status(200).json({
      result: attendence.map((att) => {
        let resObj = {};
        resObj.percentage = ((att.lectureAttended / att.totalLecturesByFaculty) * 100).toFixed(2);
        resObj.subjectCode = att.subject.subjectCode;
        resObj.subjectName = att.subject.subjectName;
        resObj.attended = att.lectureAttended;
        resObj.total = att.totalLecturesByFaculty;
        return resObj;
      }),
    });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

export const childResults = async (req, res) => {
  try {
    const { studentId } = req.body;
    const tests = await Test.find({});
    const results = [];
    for (let i = 0; i < tests.length; i++) {
      const mark = await Marks.findOne({ student: studentId, exam: tests[i]._id });
      if (mark) {
        results.push({
          test: tests[i].test,
          totalMarks: tests[i].totalMarks,
          marks: mark.marks,
          subjectCode: tests[i].subjectCode,
        });
      }
    }
    res.status(200).json({ result: results });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

export const addParent = async (req, res) => {
  try {
    const { name, email, contactNumber, avatar, address, childEmails = [] } = req.body;
    const existing = await Parent.findOne({ email });
    if (existing) {
      return res.status(400).json({ emailError: "Email already exists" });
    }
    const children = await Student.find({ email: { $in: childEmails } });
    const username = `PAR${Date.now()}`;
    const password = "123";
    const hashedPassword = await bcrypt.hash(password, 10);
    const parent = await Parent.create({
      name,
      email,
      contactNumber,
      avatar,
      address,
      username,
      password: hashedPassword,
      children: children.map((c) => c._id),
      passwordUpdated: true,
    });
    res.status(200).json({ success: true, response: parent });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

export const parentSignup = async (req, res) => {
  try {
    const { name, email, password, contactNumber, avatar, address } = req.body;
    const existing = await Parent.findOne({ email });
    if (existing) {
      return res.status(400).json({ emailError: "Email already exists" });
    }
    const username = name || email || `PAR${Date.now()}`;
    const hashedPassword = await bcrypt.hash(password, 10);
    const parent = await Parent.create({
      name,
      email,
      contactNumber,
      avatar,
      address,
      username,
      password: hashedPassword,
      passwordUpdated: true,
    });
    const token = jwt.sign({ email: parent.email, id: parent._id, role: "parent" }, "sEcReT", { expiresIn: "1h" });
    res.status(200).json({ result: parent, token });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};


