import dotenv from "dotenv";
dotenv.config();

import DB from "../db/db.js"; // path to your DB class
import "../models/auth/users.js"; // just load the model

(async () => {
  try {
    // Test connection
    await DB.connect();
    console.log("✅ Connected to MongoDB");

    // Insert test
    await DB.insert("User", { name: "Parvati", email: "parvati@example.com", age: 21 });

    // Select test
    const users = await DB.select("User");
    console.log("📋 Users:", users);

    // Count test
    const count = await DB.count("User");
    console.log("👥 User count:", count);

    // Close connection
    await DB.close();
    console.log("🔒 MongoDB connection closed");
  } catch (err) {
    console.error("❌ Error occurred:", err);
    await DB.close();
  }
})();
