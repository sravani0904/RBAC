import mongoose from "mongoose";
const { Schema } = mongoose;

const feedbackSchema = new Schema(
  {
    fromFaculty: { type: Schema.Types.ObjectId, ref: "faculty", required: true },
    toParent: { type: Schema.Types.ObjectId, ref: "parent", required: true },
    aboutStudent: { type: Schema.Types.ObjectId, ref: "student", required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { strict: false }
);

export default mongoose.model("feedback", feedbackSchema);


