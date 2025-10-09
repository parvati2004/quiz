import dotenv from "dotenv";
import mongoose from "mongoose";
import {Participant} from "../models/quiz/participants.js";
import DB from "../db/db.js";

dotenv.config();

// Main function to test Participant model
const runTest = async () => {
  try {
    // 1️⃣ Connect to the database
   await DB.connect(); // ✅ correct call — no "new" keyword needed
    console.log("Connected ✅");

    // 2️⃣ Create a new participant
    const newParticipant = new Participant({
      id: "P0034",
      teamID: "T003",
      name: "Ravi Kumar",
      email: "ravi@example.com",
      phone: "9876543210",
      dob: new Date("2005-05-12"),
      class: "10th",
      school: "Sunrise Public School",
      homeTown: "Pune",
      fatherName: "Rajesh Kumar",
      type: "individual",
    });

    // 3️⃣ Save participant to DB
    const savedParticipant = await newParticipant.save();
    console.log("✅ Saved Participant:", savedParticipant);

    // 4️⃣ Fetch all participants
    const participants = await Participant.find();
    console.log(`📋 All Participants (${participants.length}):`, participants);
  } catch (err) {
    console.error("❌ Error occurred:", err.message);
  } finally {
    // 5️⃣ Close DB connection
    await mongoose.connection.close();
    console.log("🔒 MongoDB connection closed.");
  }
};

// Run the test
runTest();
