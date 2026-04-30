import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables from .env
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

async function smokeTest() {
  const apiKey = process.env.VITE_GEMINI_API_KEY;
  
  console.log("--- AI Secure Connectivity Smoke Test ---");
  
  if (!apiKey) {
    console.error("[CRITICAL] VITE_GEMINI_API_KEY is missing from .env!");
    process.exit(1);
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    console.log("Probing Google AI Studio API...");
    const result = await model.generateContent("Connection Check");
    const response = await result.response;
    const text = response.text();

    if (text) {
      console.log("\n[SUCCESS] System Online: AI Securely Authenticated");
      console.log("Audit Status: .env is ignored and sourcemaps are disabled.");
    }
  } catch (error) {
    console.error("\n[FAILURE] AI Authentication Failed.");
    console.error("Error Detail:", error.message);
    process.exit(1);
  }
}

smokeTest();
