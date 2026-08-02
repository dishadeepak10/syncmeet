import SummaryList from "../components/SummaryList";
import { exportSummaryAsPdf } from "../utils/generatePdf";
import { useState } from "react";
import { generateSummary, saveSummary } from "../api/summaryApi";

function Dashboard() {
  const [transcript, setTranscript] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  async function handleGenerate() {
    if (!transcript.trim()) {
      setError("Please paste a transcript first.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await generateSummary(transcript);
      setResult(data);
      await saveSummary(data, transcript);
      setRefreshTrigger((prev) => prev + 1);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6">
          SyncMeet AI Assistant
        </h1>

        <textarea
          className="w-full h-48 p-4 rounded-xl bg-gray-900 border border-gray-700 text-gray-100 focus:outline-none focus:border-yellow-400"
          placeholder="Paste your meeting transcript here..."
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
        />

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="mt-4 px-6 py-3 rounded-xl bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-300 transition disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Summary"}
        </button>

        {error && <p className="mt-4 text-red-400">{error}</p>}

        {result && (
          <div className="mt-8 space-y-6">
            <div className="p-5 rounded-xl bg-gray-900 border border-gray-800">
              <h2 className="text-yellow-400 font-semibold mb-2">Summary</h2>
              <p className="text-gray-200">{result.summary}</p>
            </div>

            <div className="p-5 rounded-xl bg-gray-900 border border-gray-800">
              <h2 className="text-yellow-400 font-semibold mb-2">Action Items</h2>
              <ul className="list-disc list-inside text-gray-200 space-y-1">
                {result.actionItems?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-gray-900 border border-gray-800">
              <h2 className="text-yellow-400 font-semibold mb-2">Key Decisions</h2>
              <ul className="list-disc list-inside text-gray-200 space-y-1">
                {result.keyDecisions?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-gray-900 border border-gray-800">
              <h2 className="text-yellow-400 font-semibold mb-2">Follow-up Tasks</h2>
              <ul className="list-disc list-inside text-gray-200 space-y-1">
                {result.followUps?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => exportSummaryAsPdf(result)}
              className="px-6 py-3 rounded-xl bg-gray-800 border border-gray-700 text-yellow-400 font-semibold hover:bg-gray-700 transition"
            >
              Export as PDF
            </button>
          </div>
        )}
     <SummaryList refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
}

export default Dashboard;