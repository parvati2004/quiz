import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../models/auth/Users.js"; // Adjust path if needed
import connectDB from "../db/db.js";

dotenv.config();


const runTest = async () => {
  try {
  
    await connectDB();
    console.log("✅ Connected to MongoDB successfully.");

  
    const newUser = new User({
      email: "testuser@example.com",
      phone: "9876543210",
      name: "Test User",
      password: "securePassword123",
      role: "user",
      status: "pending",
    });


    const savedUser = await newUser.save();
    console.log("✅ Saved User:", savedUser);

    const users = await User.find();
    console.log(`📋 All Users (${users.length}):`, users);
  } catch (err) {
    console.error("❌ Error occurred:", err.message);
  } finally {
  
    await mongoose.connection.close();
    console.log("🔒 MongoDB connection closed.");
  }
};

// Run the test
runTest();
