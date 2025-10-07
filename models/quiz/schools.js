import mongoose from "mongoose";

const schoolSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true, // acts like PRIMARY KEY
  },
  name: {
    type: String,
    required: true,
  },
  moderatorEmail: {
    type: String,
    required: true,
  },
  city: {
    type: String,
  },
  coordinatorEmail: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now, // auto timestamp when created
  },
  updatedAt: {
    type: Date,
    default: Date.now, // you can update this manually on updates
  },
  status: {
    type: String,
    enum: ["verified", "pending", "deleted"],
    default: "pending",
  },
});

export const School = mongoose.model("School", schoolSchema);
