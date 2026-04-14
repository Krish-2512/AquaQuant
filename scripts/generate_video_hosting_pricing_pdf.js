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

const ensureSpace = (nextLineHeight = 16) => {
  if (y + nextLineHeight > pageHeight - margin) {
    doc.addPage();
    y = margin;
  }
};

const addTitle = (text) => {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  ensureSpace(28);
  doc.text(text, margin, y);
  y += 28;
};

const addSubtitle = (text) => {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  ensureSpace(18);
  doc.text(text, margin, y);
  y += 18;
};

const addBody = (text) => {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  const lines = doc.splitTextToSize(text, maxWidth);
  lines.forEach((line) => {
    ensureSpace(16);
    doc.text(line, margin, y);
    y += 16;
  });
  y += 6;
};

const addMono = (text) => {
  doc.setFont("courier", "normal");
  doc.setFontSize(10);
  const lines = doc.splitTextToSize(text, maxWidth);
  lines.forEach((line) => {
    ensureSpace(14);
    doc.text(line, margin, y);
    y += 14;
  });
  y += 8;
};

// ----------------------------
// Inputs / assumptions
// ----------------------------
const uploadsPerMonth = 12;
const minutesPerVideo = 60;
const months = 6;
const uploadMinutesPerMonth = uploadsPerMonth * minutesPerVideo; // 720
const totalLibraryMinutesByMonth6 = uploadMinutesPerMonth * months; // 4320

const viewers = 70;
const watchFractions = [
  { label: "25%", fraction: 0.25 },
  { label: "50%", fraction: 0.5 },
  { label: "100%", fraction: 1 },
];

const deliveredMinutesForFraction = (fraction) =>
  Math.round(viewers * uploadMinutesPerMonth * fraction);

// Typical lecture bitrate assumptions to translate hours watched into GB delivered.
// (These are rough, but help sanity check Vimeo's 2TB/month bandwidth threshold and Bunny CDN costs.)
const gbPerHour720p = 0.7;
const gbPerHour1080p = 1.4;

const deliveredHoursForFraction = (fraction) => viewers * (uploadsPerMonth * (minutesPerVideo / 60)) * fraction;
const deliveredGb = (hours, gbPerHour) => Math.round(hours * gbPerHour);

// ----------------------------
// Cloudflare Stream calculations (minutes)
// ----------------------------
const cfStorageBlocksMonth1 = Math.ceil(uploadMinutesPerMonth / 1000);
const cfStorageBlocksMonth6 = Math.ceil(totalLibraryMinutesByMonth6 / 1000);
const cfStorageCostMonth1 = cfStorageBlocksMonth1 * 5;
const cfStorageCostMonth6 = cfStorageBlocksMonth6 * 5;

const cfDeliveryCost = (deliveredMinutes) => Math.ceil(deliveredMinutes / 1000) * 1;

// ----------------------------
// Bunny Stream (CDN per GB + storage per GB)
// ----------------------------
const bunnyStoragePerGbPerMonth = 0.01; // per docs, per region
const bunnyMonthlyMinimum = 1; // bunny pricing page mentions $1 monthly minimum
const bunnyCdnAsiaPerGb = 0.03;
const bunnyCdnVolumePerGb = 0.005;

// Stored library size estimate by month 6 (GB) using the same bitrate assumptions.
const libraryHoursByMonth6 = (totalLibraryMinutesByMonth6 / 60);
const libraryGb720p = Math.round(libraryHoursByMonth6 * gbPerHour720p);
const libraryGb1080p = Math.round(libraryHoursByMonth6 * gbPerHour1080p);

// ----------------------------
// Vimeo (subscription + 2TB/month bandwidth threshold)
// ----------------------------
const vimeoBandwidthThresholdGb = 2000; // 2TB measured as 2,000GB per Vimeo help center

// ----------------------------
// PDF content
// ----------------------------
addTitle("Video Hosting Pricing Summary (Vimeo vs Bunny vs Cloudflare)");
addBody(`Generated: ${dateStr}`);
addBody("Goal: compare the cost and predictability of video hosting for your course library without overloading your main web app.");

addSubtitle("Your Upload Plan");
addBody(`Uploads: ${uploadsPerMonth} videos per month, ${minutesPerVideo} minutes each, for ${months} months.`);
addBody(`Upload volume: ${uploadMinutesPerMonth} minutes per month. Library size by month 6: ${totalLibraryMinutesByMonth6} minutes.`);

addSubtitle("Watch-Time Scenarios (Example)");
addBody(`Assumed active viewers: ${viewers}. The biggest unknown cost driver is watch time.`);
addBody("We show 3 scenarios for average watch completion per viewer per month:");
watchFractions.forEach(({ label, fraction }) => {
  const mins = deliveredMinutesForFraction(fraction);
  const hours = deliveredHoursForFraction(fraction);
  addMono(`- ${label} completion: ${mins.toLocaleString()} minutes delivered (~${hours.toFixed(0)} hours delivered)`);
});

addSubtitle("Cloudflare Stream (Minutes-Based)");
addBody("Pricing model (2 dimensions):");
addMono("- Storage: $5 per 1,000 minutes stored (prepaid, billed in blocks of 1,000 minutes).");
addMono("- Delivery: $1 per 1,000 minutes delivered (billed in blocks of 1,000 minutes).");
addBody("Estimated storage cost for your library:");
addMono(`- Month 1 stored: ${uploadMinutesPerMonth} minutes -> ${cfStorageBlocksMonth1} block(s) -> $${cfStorageCostMonth1}/month`);
addMono(`- Month 6 stored: ${totalLibraryMinutesByMonth6} minutes -> ${cfStorageBlocksMonth6} block(s) -> $${cfStorageCostMonth6}/month`);
addBody("Estimated delivery cost (your traffic decides this):");
watchFractions.forEach(({ label, fraction }) => {
  const mins = deliveredMinutesForFraction(fraction);
  addMono(`- ${label} completion: ${mins.toLocaleString()} minutes -> approx $${cfDeliveryCost(mins)}/month`);
});

addSubtitle("Bunny Stream (GB-Based)");
addBody("Pricing model (main parts):");
addMono("- Storage: from $0.01 per GB per month (per storage region).");
addMono("- CDN delivery: Standard network Asia & Oceania $0.03 per GB; Volume network from $0.005 per GB.");
addMono("- There is a $1 monthly minimum on Bunny services.");
addBody("Estimated library storage by month 6 (rough, depends on bitrate):");
addMono(`- 720p estimate: ~${libraryGb720p} GB stored -> ~$${(libraryGb720p * bunnyStoragePerGbPerMonth).toFixed(2)}/month (1 region)`);
addMono(`- 1080p estimate: ~${libraryGb1080p} GB stored -> ~$${(libraryGb1080p * bunnyStoragePerGbPerMonth).toFixed(2)}/month (1 region)`);
addBody("Estimated delivery cost per month (rough):");
watchFractions.forEach(({ label, fraction }) => {
  const hours = deliveredHoursForFraction(fraction);
  const gb720 = deliveredGb(hours, gbPerHour720p);
  const gb1080 = deliveredGb(hours, gbPerHour1080p);

  const std720 = (gb720 * bunnyCdnAsiaPerGb);
  const std1080 = (gb1080 * bunnyCdnAsiaPerGb);
  const vol720 = (gb720 * bunnyCdnVolumePerGb);
  const vol1080 = (gb1080 * bunnyCdnVolumePerGb);

  addMono(`- ${label} completion (720p): ~${gb720} GB -> ~$${std720.toFixed(2)} (Standard Asia) or ~$${vol720.toFixed(2)} (Volume)`);
  addMono(`- ${label} completion (1080p): ~${gb1080} GB -> ~$${std1080.toFixed(2)} (Standard Asia) or ~$${vol1080.toFixed(2)} (Volume)`);
});
addBody("Notes:");
addBody("1) Bunny marketing often says 'no transcoding fees' for the standard tier, but Bunny also offers an optional 'Premium Encoding' tier billed per minute (and per output codec).");
addBody("2) The GB/hour numbers are only for estimation; your actual encoded output settings decide it.");

addSubtitle("Vimeo (Subscription + Bandwidth Threshold)");
addBody("Vimeo is typically a fixed monthly/yearly subscription. The key cost risk is bandwidth.");
addMono("- Bandwidth threshold: 2TB per month (measured as 2,000GB).");
addMono("- Storage caps (examples from Vimeo help): Standard 4TB, Advanced 7TB (Starter is lower).");
addBody("Sanity check: approximate monthly bandwidth for the same watch-time scenarios (rough):");
watchFractions.forEach(({ label, fraction }) => {
  const hours = deliveredHoursForFraction(fraction);
  const gb720 = deliveredGb(hours, gbPerHour720p);
  const gb1080 = deliveredGb(hours, gbPerHour1080p);
  addMono(`- ${label} completion: ~${gb720} GB (720p) to ~${gb1080} GB (1080p) vs 2,000GB threshold`);
});
addBody("If you stay under the bandwidth threshold, Vimeo is very predictable. If you regularly exceed it, Vimeo may ask you to reduce usage or move to a custom plan.");

addSubtitle("Quick Recommendation (Cost + Scale)");
addBody("If you want predictable billing and minimal engineering: Vimeo is the simplest, but watch the 2TB/month bandwidth threshold.");
addBody("If you want low cost at scale and are OK with usage-based billing: Bunny or Cloudflare Stream typically stay cheap, and they scale without touching your Railway app.");
addBody("To avoid surprise costs on usage-based platforms: disable autoplay/preload, lazy-load the player, and set billing alerts.");

addSubtitle("Sources (Official Docs)");
addBody("Cloudflare Stream Pricing: https://developers.cloudflare.com/stream/pricing/");
addBody("Cloudflare Stream Billing Overview: https://support.cloudflare.com/hc/en-us/articles/115004555148-Billing-for-Cloudflare-Stream");
addBody("Bunny Stream Pricing (docs): https://docs.bunny.net/docs/stream-pricing");
addBody("Bunny Premium Encoding: https://docs.bunny.net/stream/premium-encoding");
addBody("Vimeo Bandwidth Threshold: https://help.vimeo.com/hc/en-us/articles/12426275404305-Bandwidth-on-Vimeo-");
addBody("Vimeo Standard Plan (storage): https://help.vimeo.com/hc/en-us/articles/12425416126353-What-s-included-with-the-Standard-plan-");
addBody("Vimeo Advanced Plan (storage): https://help.vimeo.com/hc/en-us/articles/12425416051601-About-the-Vimeo-Advanced-plan");

const outputPath = path.join(
  __dirname,
  "..",
  `Video_Hosting_Pricing_Comparison_${dateStr}.pdf`
);
const pdfBytes = doc.output("arraybuffer");
fs.writeFileSync(outputPath, Buffer.from(pdfBytes));

console.log(`Saved: ${outputPath}`);

