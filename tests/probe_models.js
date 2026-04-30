import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

async function list() {
  const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY);
  try {
    // Note: listModels is not on the genAI object directly in some versions
    // Usually it's via a client, but let's try a simpler way.
    // Actually, I'll just try 'gemini-1.5-flash' and 'gemini-pro'
    const models = ['gemini-1.5-flash', 'gemini-1.5-flash-8b', 'gemini-pro'];
    for (const m of models) {
      try {
        const model = genAI.getGenerativeModel({ model: m });
        const res = await model.generateContent("Hi");
        console.log(`${m} works!`);
      } catch (e) {
        console.log(`${m} failed: ${e.message}`);
      }
    }
  } catch (err) {
    console.error(err);
  }
}
list();
