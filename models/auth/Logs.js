import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    loginId: {
      type: String,
      required: true,
      unique: true, // Acts as PRIMARY KEY
    },
    email: {
      type: String,
    },
    loggedInAt: {
      type: Date, // Same as DATETIME
    },
    ip: {
      type: String,
    },
    os: {
      type: String,
    },
    browser: {
      type: String,
    },
    loggedOutAt: {
      type: Date,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

const Log = mongoose.model("Log", logSchema);

export default Log;
