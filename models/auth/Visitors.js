import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema(
  {
    visitorId: {
      type: String,
      required: true,
      unique: true, // Acts like PRIMARY KEY
    },
    ip: {
      type: String,
      required: true,
    },
    os: {
      type: String,
    },
    browser: {
      type: String,
    },
    visitedAt: {
      type: Date, // Equivalent to DATETIME in SQL
    },
    url: {
      type: String,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

const Visitor = mongoose.model("Visitor", visitorSchema);

export default Visitor;
