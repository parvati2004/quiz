import dotenv from "dotenv";
import mongoose from "mongoose";
import Visitor from "../models/auth/Visitors.js"; 
import connectDB from "../db/db.js";

dotenv.config();


const runTest = async () => {
  try {

    await connectDB();
    console.log("✅ Connected to MongoDB successfully.");

    
    const newVisitor = new Visitor({
      visitorId: "V001",
      ip: "192.168.1.10",
      os: "Windows 11",
      browser: "Chrome",
      visitedAt: new Date(),
      url: "https://example.com/home",
    });

  
    const savedVisitor = await newVisitor.save();
    console.log("✅ Saved Visitor:", savedVisitor);

  
    const visitors = await Visitor.find();
    console.log(`📋 All Visitors (${visitors.length}):`, visitors);
  } catch (err) {
    console.error("❌ Error occurred:", err.message);
  } finally {
   

    await mongoose.connection.close();
    console.log("🔒 MongoDB connection closed.");
  }
};


runTest();
