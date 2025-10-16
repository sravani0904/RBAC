import mongoose from "mongoose";
const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    from: { type: Schema.Types.ObjectId, refPath: "fromModel", required: true },
    fromModel: { type: String, enum: ["faculty", "parent"], required: true },
    to: { type: Schema.Types.ObjectId, refPath: "toModel", required: true },
    toModel: { type: String, enum: ["faculty", "parent"], required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    readAt: { type: Date },
  },
  { strict: false }
);

export default mongoose.model("message", messageSchema);


