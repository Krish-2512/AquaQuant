import mongoose from "mongoose";

const AttachmentSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    type: { type: String, default: "file" },
    url: { type: String, required: true },
  },
  { _id: false }
);

const CohortContentSchema = new mongoose.Schema(
  {
    week: { type: String, required: true },
    title: { type: String, required: true },
    summary: { type: String, default: "" },
    videoUrl: { type: String, default: "" },
    attachments: { type: [AttachmentSchema], default: [] },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.models.CohortContent ||
  mongoose.model("CohortContent", CohortContentSchema);
