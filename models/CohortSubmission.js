import mongoose from "mongoose";

const CohortSubmissionSchema = new mongoose.Schema(
  {
    contentId: { type: mongoose.Schema.Types.ObjectId, ref: "CohortContent" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    fileName: { type: String, required: true },
    fileUrl: { type: String, required: true },
    fileType: { type: String, default: "file" },
    note: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.CohortSubmission ||
  mongoose.model("CohortSubmission", CohortSubmissionSchema);
