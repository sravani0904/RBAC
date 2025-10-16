import mongoose from "mongoose";
const { Schema } = mongoose;

const parentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  contactNumber: {
    type: Number,
  },
  avatar: {
    type: String,
  },
  address: {
    type: String,
  },
  children: [
    {
      type: Schema.Types.ObjectId,
      ref: "student",
    },
  ],
  passwordUpdated: {
    type: Boolean,
    default: false,
  },
  resetToken: {
    type: String,
  },
  resetTokenExpiresAt: {
    type: Date,
  },
});

export default mongoose.model("parent", parentSchema);


