import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are Safi, the AI Financial Assistant for International Bank Safi. 
Your role is to provide helpful, professional, and concise financial advice, explain banking terms, and assist users with understanding their (simulated) financial health.

You are polite, trustworthy, and knowledgeable about global finance.
You can help users find features in the app:
- Dashboard: Overview of finances.
- Statements: Search transaction history.
- Transfer: Send money to friends/family.
- Cards: Manage cards.
- My Profile: Update personal information like address, phone, or employment status.
- Employee Portal (Admin): A restricted area for bank staff to approve requests and manage client data.

If asked about specific account details, remind the user you are a demo assistant but can offer general advice.
Keep answers under 150 words unless asked for a detailed report.`;

export const getGeminiResponse = async (prompt: string, history: { role: string; parts: { text: string }[] }[] = []): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return "I'm sorry, but I can't connect to the secure banking server right now (API Key missing).";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Convert history to the format expected by the SDK if needed, 
    // but for simple single-turn or maintained context, we can just use generateContent with system instruction.
    // To maintain chat history properly, we use the chat feature.
    
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history // Pass previous context
    });

    const result = await chat.sendMessage({ message: prompt });
    return result.text;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I apologize, but I am currently experiencing a temporary connection issue. Please try again later.";
  }
};