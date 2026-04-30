import { GoogleGenerativeAI } from "@google/generative-ai";
import Groq from "groq-sdk";
import { logEvent, analytics } from '../lib/firebase';
import { logError } from '../utils/logger';
import { OFFLINE_FAQS as faqs } from '../data/faqs.js';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const geminiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true
});

const SYSTEM_INSTRUCTION = `You are the ElectED Assistant. Your sole purpose is to educate users on the election process, voting steps, and registration.`;

export function validateElectionQuery(query) {
  const electionKeywords = ['vote', 'election', 'voter', 'ballot', 'poll', 'booth', 'registration', 'form', 'evm', 'vvpat', 'id', 'epic', 'aadhaar', 'counting', 'result', 'candidate', 'constituency', 'eci', 'democracy', 'namaste', 'hello'];
  const q = query.toLowerCase();
  return electionKeywords.some(keyword => q.includes(keyword));
}

async function getGeminiResponse(prompt, language) {
  const currentLanguage = language === "hi" ? "Hindi" : "English";
  const chat = geminiModel.startChat({ history: [], generationConfig: { maxOutputTokens: 1024, temperature: 0.2 } });
  const result = await chat.sendMessage(`${SYSTEM_INSTRUCTION}\n\nRespond in ${currentLanguage}.\n\nUser: ${prompt}`);
  return (await result.response).text();
}

async function getGroqResponse(prompt, language) {
  const currentLanguage = language === "hi" ? "Hindi" : "English";
  const chatCompletion = await groq.chat.completions.create({
    messages: [{ role: "system", content: `${SYSTEM_INSTRUCTION}\n\nRespond in ${currentLanguage}.` }, { role: "user", content: prompt }],
    model: "llama-3.1-8b-instant",
    temperature: 0.2,
    max_tokens: 1024,
  });
  return chatCompletion.choices[0]?.message?.content;
}

function getLocalResponse(prompt, language) {
  const q = prompt.toLowerCase();
  const match = faqs.find(f => f.question.toLowerCase().includes(q) || q.includes(f.question.toLowerCase()));
  if (match) return { text: language === "hi" ? (match.answerHi || match.answer) : match.answer, provider: 'local', isOffline: true };
  return { text: language === "hi" ? "क्षमा करें, मैं केवल सामान्य प्रश्नों का उत्तर दे सकता हूँ।" : "I'm sorry, I can only answer common election questions at the moment.", provider: 'local', isOffline: true };
}

export async function generateElectionResponse(prompt, language = "en") {
  const startTime = Date.now();
  if (!validateElectionQuery(prompt)) return { text: language === "hi" ? "मैं केवल मतदान संबंधी प्रश्नों में सहायता कर सकता हूँ।" : "I can only assist with voting-related queries.", isOffline: false, provider: 'guardrail' };

  try {
    const text = await getGeminiResponse(prompt, language);
    if (text) { recordTelemetry('gemini', true, startTime); return { text, provider: 'gemini', isOffline: false }; }
  } catch (err) { logError(err, 'Gemini_Failover'); }

  try {
    const text = await getGroqResponse(prompt, language);
    if (text) { recordTelemetry('groq', true, startTime); return { text, provider: 'groq', isOffline: false }; }
  } catch (err) { logError(err, 'Groq_Failover'); }

  const local = getLocalResponse(prompt, language);
  recordTelemetry('local', false, startTime);
  return local;
}

function recordTelemetry(provider, isAI, startTime) {
  if (!analytics) return;
  logEvent(analytics, 'ai_chat_interaction', { provider, is_ai: isAI, latency_ms: Date.now() - startTime });
}
