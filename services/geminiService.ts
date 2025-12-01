
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Language } from '../types';

// Helper to get client with either user key or env key
const getAiClient = (userKey?: string) => {
  const key = userKey || import.meta.env.VITE_GEMINI_API_KEY;
  if (!key) {
    // Only warn if we intend to use it, but here we just return null
    return null;
  }
  return new GoogleGenerativeAI(key);
};

export const explainPattern = async (code: string, concept: string, lang: Language, apiKey?: string): Promise<string> => {
  const ai = getAiClient(apiKey);
  
  // If no AI client available, return null so UI can fallback to static text
  if (!ai) return "";

  try {
    const langInstruction = lang === 'hi' 
      ? "Explain in simple, conversational Hindi (using Devanagari script). Use English for technical terms like 'Variable', 'Loop', 'Function', 'Code' and variable names 'x', 'y', 't'." 
      : "Explain in simple English suitable for a beginner/child.";

    const prompt = `
      You are an expert creative coder and educator teaching a beginner about LED matrix art.
      ${langInstruction}
      
      The student is learning about: "${concept}".
      They are currently experimenting with this code:
      
      \`\`\`javascript
      ${code}
      \`\`\`
      
      Explain how this math creates the visual pattern they are seeing. 
      
      Formatting Rules:
      - Use short paragraphs.
      - Use bullet points for key steps.
      - Use bold text for variable names (like **x**, **t**, **sin**).
      - Keep the tone encouraging, magical, and simple.
      - Use analogies (e.g., "like a heartbeat", "like a wave in the ocean", "like a spinning wheel").
    `;

    const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);

    return result.response.text() || (lang === 'hi' ? "मैं अभी समझा नहीं पा रहा हूँ।" : "I couldn't generate an explanation right now.");
  } catch (error) {
    console.error("Gemini API Error:", error);
    return lang === 'hi' ? "AI से संपर्क करने में त्रुटि हुई।" : "An error occurred while contacting the AI Tutor.";
  }
};

