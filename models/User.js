import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  image: String,
  university: { type: String, default: "" },
  gradYear: { type: String, default: "" },
  experience: { type: String, default: "" },
  
  isOnboarded: {
    type: Boolean,
    default: false
  },
  

}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);