import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

// Use your API Key from the .env file
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function summarizeContent(content: string) {
  try {
    // FIX: Use the stable
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Summarize this content in exactly two sentences: ${content}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return "AI summarization failed. Check your model string or API key.";
  }
}
