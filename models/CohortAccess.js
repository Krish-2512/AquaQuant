import mongoose from "mongoose";

const CohortAccessSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    email: { type: String, required: true, unique: true, index: true },
    passcode: { type: String, required: true },
    passcodeUpdatedAt: { type: Date, default: Date.now },
    createdBy: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.CohortAccess ||
  mongoose.model("CohortAccess", CohortAccessSchema);

