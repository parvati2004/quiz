import dotenv from "dotenv";
import mongoose from "mongoose";
import { Result } from "../models/quiz/Results.js"; // adjust path if needed
import connectDB from "../db/db.js";

dotenv.config();

const runTest = async () => {
  try {
    // 1️⃣ Connect to DB
    await connectDB();
    console.log("✅ Connected to MongoDB successfully.");

    // 2️⃣ Create a new result
    const newResult = new Result({
      round: "preliminary",
      teamId: "T001",
      position: "qualified",
    });

    // 3️⃣ Save result to DB
    const savedResult = await newResult.save();
    console.log("✅ Saved Result:", savedResult);

    // 4️⃣ Fetch all results
    const results = await Result.find();
    console.log(`📋 All Results (${results.length}):`, results);
  } catch (err) {
    console.error("❌ Error occurred:", err.message);
  } finally {
    // 5️⃣ Close DB connection
    await mongoose.connection.close();
    console.log("🔒 MongoDB connection closed.");
  }
};

runTest();
