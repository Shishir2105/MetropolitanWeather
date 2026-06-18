import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Groq from 'groq-sdk';

dotenv.config();

console.log("--- Metropolitan Weather Diagnostician ---");
console.log("API_KEY:", process.env.API_KEY ? "Loaded (Length: " + process.env.API_KEY.length + ")" : "Missing");
console.log("MONGODB_CLIENT:", process.env.MONGODB_CLIENT ? "Loaded" : "Missing");
console.log("GROQ_API_KEY:", process.env.GROQ_API_KEY ? "Loaded" : "Missing");

async function runTests() {
  try {
    console.log("\n1. Testing MongoDB Connection...");
    await mongoose.connect(process.env.MONGODB_CLIENT, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("✅ MongoDB Connected successfully!");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err.message || err);
  }

  try {
    console.log("\n2. Testing Groq API Key...");
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: "Say 'Key is working!'" }],
      model: "llama-3.1-8b-instant",
    });
    console.log("✅ Groq API Working! Response:", completion.choices[0]?.message?.content);
  } catch (err) {
    console.error("❌ Groq API Failed:", err.message || err);
  }

  process.exit(0);
}

runTests();
