require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

// The SDK automatically reads GEMINI_API_KEY from your .env file
const ai = new GoogleGenAI({});

async function generateMeetingSummary(transcript) {
  const prompt = `
You are an assistant that summarizes meeting transcripts.
Given the transcript below, return ONLY valid JSON (no markdown, no code fences) in exactly this shape:

{
  "summary": "a short paragraph summarizing the meeting",
  "actionItems": ["short action item 1", "short action item 2"],
  "keyDecisions": ["decision 1", "decision 2"],
  "followUps": ["follow-up task 1", "follow-up task 2"]
}

Transcript:
"""
${transcript}
"""
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: prompt,
  });

  const rawText = response.text;

  // Gemini sometimes wraps JSON in ```json fences even when asked not to — strip those just in case
  const cleaned = rawText.replace(/```json|```/g, "").trim();

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    throw new Error("Gemini did not return valid JSON: " + rawText);
  }
}

module.exports = { generateMeetingSummary };