import Groq from "groq-sdk";
import { logError } from '../utils/logger';

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true // Required for client-side integration
});

const SYSTEM_INSTRUCTION = `You are the ElectED Assistant. Your sole purpose is to educate users on the election process, voting steps, and registration.

TOPIC LIMIT: If the user asks about anything unrelated to voting (e.g., math, coding, personal advice, or sports), politely decline and say: "I am an election education specialist. I can only assist with voting-related queries. How can I help you with your ballot today?"

NEUTRALITY: Do not discuss political parties, candidates, or opinions.

CONTEXT: Provide clear, step-by-step guidance on how to vote, required IDs, and EVM usage.`;

/**
 * Client-side guardrail to filter out non-election queries
 */
export function validateElectionQuery(query) {
  const electionKeywords = [
    'vote', 'election', 'voter', 'ballot', 'poll', 'booth', 'registration', 
    'form', 'evm', 'vvpat', 'id', 'epic', 'aadhaar', 'counting', 
    'result', 'candidate', 'constituency', 'eci', 'democracy', 'namaste', 'hello'
  ];
  const q = query.toLowerCase();
  return electionKeywords.some(keyword => q.includes(keyword));
}

export async function generateElectionResponse(prompt, language = "en") {
  if (typeof window !== "undefined" && !window.navigator.onLine) {
    return { text: null, isOffline: true };
  }

  if (!validateElectionQuery(prompt)) {
    return {
      text: language === "hi" 
        ? "मैं एक चुनाव शिक्षा विशेषज्ञ हूं। मैं केवल मतदान संबंधी प्रश्नों में सहायता कर सकता हूँ।"
        : "I am an election education specialist. I can only assist with voting-related queries. How can I help you with your ballot today?",
      isOffline: false
    };
  }

  try {
    const currentLanguage = language === "hi" ? "Hindi" : "English";
    const dynamicInstruction = `${SYSTEM_INSTRUCTION}\n\nRespond in the user's selected language ${currentLanguage}. Keep all election protocols accurate to the Election Commission of India guidelines.`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: dynamicInstruction,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-8b-8192",
      temperature: 0.2,
      max_tokens: 2048,
    });

    const text = chatCompletion.choices[0]?.message?.content || "No response found.";

    console.info("AI Response Generated Successfully via Groq SDK (LLaMA 3)");
    return { text, isOffline: false };
  } catch (error) {
    await logError(error, 'GroqSDK');
    return { text: null, isOffline: true };
  }
}
