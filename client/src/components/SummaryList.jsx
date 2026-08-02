import { useEffect, useState } from "react";
import { getAllSummaries, deleteSummary } from "../api/summaryApi";
import { exportSummaryAsPdf } from "../utils/generatePdf";
function SummaryList({ refreshTrigger }) {
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSummaries();
  }, [refreshTrigger]);

  async function loadSummaries() {
    setLoading(true);
    const data = await getAllSummaries();
    setSummaries(data);
    setLoading(false);
  }

  async function handleDelete(id) {
    await deleteSummary(id);
    setSummaries((prev) => prev.filter((s) => s.id !== id));
  }

  if (loading) {
    return <p className="text-gray-400 mt-8">Loading previous summaries...</p>;
  }

  if (summaries.length === 0) {
    return <p className="text-gray-400 mt-8">No summaries saved yet.</p>;
  }

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4">
        Previous Summaries
      </h2>
      <div className="space-y-4">
        {summaries.map((s) => (
          <div
            key={s.id}
            className="p-5 rounded-xl bg-gray-900 border border-gray-800 flex justify-between items-start gap-4"
          >
            <p className="text-gray-200">{s.summary}</p>
            <div className="shrink-0 flex gap-2">
              <button
                onClick={() => exportSummaryAsPdf(s)}
                className="px-3 py-1 rounded-lg bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400/20 transition text-sm"
              >
                Export
              </button>
              <button
                onClick={() => handleDelete(s.id)}
                className="px-3 py-1 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SummaryList;