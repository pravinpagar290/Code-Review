require("dotenv").config(); // Load .env before anything else
const { GoogleGenerativeAI } = require("@google/generative-ai");

console.log("Using API key:", process.env.GOOGLE_GEMINI_KEY ? "✅ Loaded" : "❌ Missing");

const genAI = new GoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GEMINI_KEY,
});

async function testGemini() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Say hello from Gemini!");
    console.log("Gemini says:", result.response.text());
  } catch (error) {
    console.error("❌ API call failed:", error);
  }
}

testGemini();
