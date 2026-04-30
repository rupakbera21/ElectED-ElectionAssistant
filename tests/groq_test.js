import Groq from "groq-sdk";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

async function testGroq() {
  const apiKey = process.env.VITE_GROQ_API_KEY;
  
  console.log("--- Groq SDK Connectivity Test ---");
  
  if (!apiKey) {
    console.error("[ERROR] VITE_GROQ_API_KEY missing!");
    process.exit(1);
  }

  const groq = new Groq({ apiKey });

  try {
    console.log("Sending prompt to LLaMA 3...");
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "user", content: "Say 'System Online via Groq'" },
      ],
      model: "llama-3.1-8b-instant",
    });

    const response = chatCompletion.choices[0]?.message?.content;
    console.log(`\n[SUCCESS] Groq Response: ${response}`);
  } catch (error) {
    console.error(`\n[FAILURE] Groq Connection Failed: ${error.message}`);
    process.exit(1);
  }
}

testGroq();
