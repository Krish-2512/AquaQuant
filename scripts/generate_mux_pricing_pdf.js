const { jsPDF } = require("jspdf");
const fs = require("fs");
const path = require("path");

const now = new Date();
const dateStr = now.toISOString().slice(0, 10);

const doc = new jsPDF({
  unit: "pt",
  format: "a4",
});

const margin = 48;
const pageWidth = doc.internal.pageSize.getWidth();
const pageHeight = doc.internal.pageSize.getHeight();
const maxWidth = pageWidth - margin * 2;
let y = margin;

const addTitle = (text) => {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(text, margin, y);
  y += 28;
};

const addSubtitle = (text) => {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(text, margin, y);
  y += 18;
};

const addBody = (text) => {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  const lines = doc.splitTextToSize(text, maxWidth);
  lines.forEach((line) => {
    if (y > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
    doc.text(line, margin, y);
    y += 16;
  });
  y += 6;
};

addTitle("MUX Pricing Summary");
addBody(`Generated: ${dateStr}`);
addBody("This summary captures the key Mux pricing points for video delivery. Pricing changes over time; always confirm the latest numbers in the official Mux pricing pages before final budgeting.");

addSubtitle("Pricing Structure");
addBody("Mux charges in three main buckets:");
addBody("1) Input (encoding) — charged by minutes of video uploaded.");
addBody("2) Storage — charged by minutes of video stored per month.");
addBody("3) Delivery — charged by minutes streamed to viewers.");

addSubtitle("Key Price Points (as of April 2026)");
addBody("Delivery: The first 100,000 minutes per month are free. After that, delivery starts around $0.0008 per minute for 720p (basic/plus quality).");
addBody("Storage: Starts around $0.0024 per minute per month for 720p (basic/plus quality).");
addBody("DRM (optional): $100/month access fee + $0.003 per license.");

addSubtitle("Why This Matters");
addBody("Mux is cost-effective for early cohorts because the free delivery tier often covers initial usage. Costs rise mostly with high streaming minutes or large libraries of stored video.");

addSubtitle("Simple Estimate Example");
addBody("If you store 10 videos of 60 minutes each (600 minutes total):");
addBody("- Storage estimate: 600 x $0.0024 = ~$1.44 per month.");
addBody("If 100 students watch 30 minutes each per month (3,000 minutes):");
addBody("- Delivery estimate: 3,000 minutes is within the free 100,000 minutes, so delivery cost is $0.");

addSubtitle("References");
addBody("Mux Pricing: https://www.mux.com/pricing/video");
addBody("Mux Pricing Guide: https://www.mux.com/docs/pricing/video");

const outputPath = path.join(__dirname, "..", `MUX_Pricing_Summary_${dateStr}.pdf`);
const pdfBytes = doc.output("arraybuffer");
fs.writeFileSync(outputPath, Buffer.from(pdfBytes));

console.log(`Saved: ${outputPath}`);
