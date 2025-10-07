import dotenv from "dotenv";
import mongoose from "mongoose";
import { School } from "../models/quiz/Schools.js"; // adjust path if needed
import connectDB from "../db/db.js";

dotenv.config();

const runTest = async () => {
  try {
    // 1️⃣ Connect to the database
    await connectDB();
    console.log("✅ Connected to MongoDB successfully.");

    // 2️⃣ Create a new school
    const newSchool = new School({
      id: "S001",
      name: "Sunrise Public School",
      moderatorEmail: "moderator@sunrise.com",
      city: "Pune",
      coordinatorEmail: "coordinator@sunrise.com",
    });

    // 3️⃣ Save school to DB
    const savedSchool = await newSchool.save();
    console.log("✅ Saved School:", savedSchool);

    // 4️⃣ Fetch all schools
    const schools = await School.find();
    console.log(`📋 All Schools (${schools.length}):`, schools);
  } catch (err) {
    console.error("❌ Error occurred:", err.message);
  } finally {
    // 5️⃣ Close DB connection
    await mongoose.connection.close();
    console.log("🔒 MongoDB connection closed.");
  }
};

runTest();
