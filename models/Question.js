import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true, trim: true },
  content: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Probability', 'Statistics', 'BrainTeasers', 'Finance', 'Coding'],
    required: true 
  },
  difficulty: { 
    type: String, 
    enum: ['Easy', 'Medium', 'Hard'],
    required: true 
  },
  status: { 
    type: String, 
    enum: ['UnAttempted', 'Attempted', 'Finished'], 
    default: 'UnAttempted' 
  },
  companyTags: { 
    type: [String], 
   // default: ['N/A'] 
  },
  answer: { type: String, required: true },
  solution: { type: String, required: true },
  relatedTopics: { 
    type: [String], 
    default: [] 
  },
  createdAt: { type: Date, default: Date.now }
}, { 
  collection: 'questions',
  timestamps: true 
});

export default mongoose.models.Question || mongoose.model('Question', QuestionSchema);










// import mongoose from 'mongoose';

// const QuestionSchema = new mongoose.Schema({
//   title: { type: String, required: true, unique: true, trim: true },
//   content: { type: String, required: true },
//   category: { 
//     type: String, 
//     enum: ['Probability', 'Statistics', 'BrainTeasers', 'Finance', 'Coding'],
//     required: true 
//   },
//   difficulty: { 
//     type: String, 
//     enum: ['Easy', 'Medium', 'Hard'],
//     required: true 
//   },
//   status: { 
//     type: String, 
//     enum: ['UnAttempted', 'Attempted', 'Finished'], 
//     default: 'UnAttempted' 
//   },
//   companyTags: { 
//     type: [String], 
//     default: ['N/A'] 
//   },
//   solution: { type: String, required: true },
//   relatedTopics: { 
//     type: [String], 
//     default: [] 
//   },

//   // --- NEW OPTIONAL FIELDS FOR CODING ---
//   constraints: { 
//     type: [String], 
//     default: [] 
//   },
//   testCases: [
//     {
//       input: { type: String },
//       output: { type: String },
//       isSample: { type: Boolean, default: true }
//     }
//   ],
//   starterCode: {
//     type: String, // e.g., "function solution(n) { \n\n }"
//     default: ""
//   }
//   // --------------------------------------

// }, { 
//   collection: 'questions',
//   timestamps: true 
// });

// export default mongoose.models.Question || mongoose.model('Question', QuestionSchema);