import mongoose from 'mongoose';

const CodingQuestionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  problemStatement: { type: String, required: true }, // Changed from 'content'
  category: { type: String, default: 'coding' },      // Added for filtering
  starterCode: {
    javascript: { type: String, default: "function solution(input) {\n  // write code\n}" },
    python: { type: String, default: "def solution(input):\n    # write code" }
  },
  testCases: [{
    input: { type: String, required: true },
    expectedOutput: { type: String, required: true },
    isPublic: { type: Boolean, default: true }
  }],
  // Add this inside your CodingQuestionSchema
solutionCode: {
  javascript: { type: String },
  python: { type: String }
},
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Easy' }
}, { timestamps: true });

export default mongoose.models.CodingQuestion || mongoose.model('CodingQuestion', CodingQuestionSchema);