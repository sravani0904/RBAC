import Feedback from "../models/feedback.js";
import Message from "../models/message.js";
import Parent from "../models/parent.js";

export const sendFeedback = async (req, res) => {
  try {
    const { toParentId, aboutStudentId, message } = req.body;
    const fromFacultyId = req.userId;
    // ---- New Code: Verify parent-child relationship ----
    const parent = await Parent.findOne({ _id: toParentId, children: aboutStudentId });
    if (!parent) {
      return res.status(400).json({ error: "Selected parent is not linked to this student!" });
    }
    // ---- (End new code) ----
    const feedback = await Feedback.create({
      fromFaculty: fromFacultyId,
      toParent: toParentId,
      aboutStudent: aboutStudentId,
      message,
    });
    res.status(200).json({ success: true, response: feedback });
  } catch (error) {
    res.status(500).json({ backendError: error });
  }
};

export const listFeedback = async (req, res) => {
  try {
    const role = req.role;
    if (role === "admin") {
      const all = await Feedback.find({}).populate("fromFaculty toParent aboutStudent");
      return res.status(200).json(all);
    }
    if (role === "parent") {
      const mine = await Feedback.find({ toParent: req.userId }).populate("fromFaculty toParent aboutStudent");
      return res.status(200).json(mine);
    }
    if (role === "faculty") {
      const mine = await Feedback.find({ fromFaculty: req.userId }).populate("fromFaculty toParent aboutStudent");
      return res.status(200).json(mine);
    }
    return res.status(403).json({ message: "Forbidden" });
  } catch (error) {
    res.status(500).json({ backendError: error });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { toId, content } = req.body;
    const fromId = req.userId;
    const fromModel = req.role;
    const toModel = req.role === "faculty" ? "parent" : "faculty";
    const msg = await Message.create({ from: fromId, fromModel, to: toId, toModel, content });
    res.status(200).json({ success: true, response: msg });
  } catch (error) {
    res.status(500).json({ backendError: error });
  }
};

export const listMessages = async (req, res) => {
  try {
    const msgs = await Message.find({ $or: [{ from: req.userId }, { to: req.userId }] });
    res.status(200).json(msgs);
  } catch (error) {
    res.status(500).json({ backendError: error });
  }
};


