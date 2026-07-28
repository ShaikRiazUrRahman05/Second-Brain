// import { GoogleGenerativeAI } from "@google/generative-ai";
// import dotenv from "dotenv";

// dotenv.config();

// // Use your API Key from the .env file
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// export async function summarizeContent(content: string) {
//   try {
//     // FIX: Use the stable
//     const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

//     const prompt = `Summarize this content in exactly two sentences: ${content}`;

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     return response.text();
//   } catch (error) {
//     console.error("Gemini AI Error:", error);
//     return "AI summarization failed. Check your model string or API key.";
//   }
// }

import { GoogleGenerativeAI } from "@google/generative-ai";
import { YoutubeTranscript } from "youtube-transcript";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// ─── Extract YouTube Video ID ───────────────────────────────────
function extractYouTubeVideoId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/|youtube\.com\/live\/)([a-zA-Z0-9_-]{11})/,
  );
  return match?.[1] ?? null; // ← FIXED: optional chaining + nullish coalescing
}

// ─── Check if Twitter/X URL ───────────────────────────────────
function isTwitterUrl(url: string): boolean {
  return /(twitter\.com|x\.com)\/.+\/status\/\d+/.test(url);
}

// ─── Fetch Tweet Text via Open Graph ────────────────────────────
async function fetchTweetText(url: string): Promise<string | null> {
  try {
    const cleanUrl = url.replace("x.com", "twitter.com");
    const response = await fetch(cleanUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });
    const html = await response.text();

    const match = html.match(
      /<meta[^>]*property="og:description"[^>]*content="([^"]*)"/,
    );

    // ← FIXED: optional chaining on match[1]
    return match?.[1]?.replace(/&quot;/g, '"')?.replace(/&amp;/g, "&") ?? null;
  } catch {
    return null;
  }
}

export async function summarizeContent(link: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    let contentToSummarize = link;
    let sourceType = "web content";

    // ─── YouTube: Fetch transcript ──────────────────────────────
    const videoId = extractYouTubeVideoId(link);
    if (videoId) {
      try {
        const transcript = await YoutubeTranscript.fetchTranscript(videoId);
        const fullText = transcript.map((t) => t.text).join(" ");
        contentToSummarize = fullText.slice(0, 4000);
        sourceType = "YouTube video";
      } catch (e) {
        console.log("No transcript available, falling back to URL");
      }
    }

    // ─── Twitter/X: Fetch tweet text ──────────────────────────
    if (isTwitterUrl(link)) {
      const tweetText = await fetchTweetText(link);
      if (tweetText) {
        contentToSummarize = tweetText;
        sourceType = "tweet";
      }
    }

    const prompt = `Summarize the following ${sourceType} in exactly 2 concise, meaningful sentences. Focus on the key message and main takeaway:

"""
${contentToSummarize}
"""

Summary (2 sentences):`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();

    if (!text.endsWith(".") && !text.endsWith("!") && !text.endsWith("?")) {
      text += ".";
    }

    return text;
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return "Could not summarize this content. It may not have accessible text (e.g., no captions, private video, or restricted tweet).";
  }
}
