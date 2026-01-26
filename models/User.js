import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  university: { type: String, default: 'Not Specified' },
  image: { type: String }, // For Google/Github profile pics
  
  // High-level Progress
  totalAttempted: { type: Number, default: 0 },
  totalCorrect: { type: Number, default: 0 },

  // Category Breakdown
  categoryStats: {
    probability: { attempted: { type: Number, default: 0 }, correct: { type: Number, default: 0 } },
    brainteaser: { attempted: { type: Number, default: 0 }, correct: { type: Number, default: 0 } },
    finance: { attempted: { type: Number, default: 0 }, correct: { type: Number, default: 0 } },
    statistics: { attempted: { type: Number, default: 0 }, correct: { type: Number, default: 0 } },
    coding: { attempted: { type: Number, default: 0 }, correct: { type: Number, default: 0 } },
  },

  // Deep tracking for every question
  questionProgress: [{
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    status: { type: String, enum: ['Attempted', 'Solved'], default: 'Attempted' },
    attemptsCount: { type: Number, default: 1 },
    lastAttempted: { type: Date, default: Date.now },
    userNotes: { type: String },
    
    // PDF Upload Tracking
    attachments: [{
      fileName: String,
      fileUrl: String, // URL from Cloudinary/AWS S3
      uploadedAt: { type: Date, default: Date.now }
    }]
  }]
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);