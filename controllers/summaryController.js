const { generateMeetingSummary } = require("../services/geminiService");

async function createSummary(req, res) {
  try {
    const { transcript } = req.body;

    if (!transcript || transcript.trim() === "") {
      return res.status(400).json({ error: "Transcript is required" });
    }

    const result = await generateMeetingSummary(transcript);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error generating summary:", error.message);
    res.status(500).json({ error: "Failed to generate summary" });
  }
}

module.exports = { createSummary };