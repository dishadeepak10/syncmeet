import jsPDF from "jspdf";

export function exportSummaryAsPdf(summaryData) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  const maxWidth = pageWidth - margin * 2;
  let y = 20;

  function addSection(title, content) {
    doc.setFont(undefined, "bold");
    doc.setFontSize(13);
    doc.text(title, margin, y);
    y += 7;

    doc.setFont(undefined, "normal");
    doc.setFontSize(11);

    const lines = Array.isArray(content)
      ? content.map((item) => `• ${item}`)
      : doc.splitTextToSize(content, maxWidth);

    lines.forEach((line) => {
      const wrapped = doc.splitTextToSize(line, maxWidth);
      wrapped.forEach((wrappedLine) => {
        if (y > 280) {
          doc.addPage();
          y = 20;
        }
        doc.text(wrappedLine, margin, y);
        y += 6;
      });
    });

    y += 6;
  }

  doc.setFontSize(16);
  doc.setFont(undefined, "bold");
  doc.text("SyncMeet AI — Meeting Summary", margin, y);
  y += 12;

  addSection("Summary", summaryData.summary || "N/A");
  addSection("Action Items", summaryData.actionItems || []);
  addSection("Key Decisions", summaryData.keyDecisions || []);
  addSection("Follow-up Tasks", summaryData.followUps || []);

  doc.save(`meeting-summary-${Date.now()}.pdf`);
}