import dotenv from "dotenv";
import mongoose from "mongoose";
import Log from "../models/auth/logs.js"; // adjust the path if needed
import DB from "../db/db.js";

dotenv.config();

const runTest = async () => {
  try {
  
    await DB.connect(); // ✅ correct call — no "new" keyword needed
       console.log("Connected ✅");
  
    const newLog = new Log({
      loginId: "L021",
      email: "user@example.com",
      loggedInAt: new Date(),
      ip: "192.168.1.1",
      os: "Windows 11",
      browser: "Chrome",
      loggedOutAt: null, 
    });

 
    const savedLog = await newLog.save();
    console.log("✅ Saved Log:", savedLog);

    
    const logs = await Log.find();
    console.log(`📋 All Logs (${logs.length}):`, logs);
  } catch (err) {
    console.error("❌ Error occurred:", err.message);
  } finally {
   
    await mongoose.connection.close();
    console.log("🔒 MongoDB connection closed.");
  }
};


runTest();
