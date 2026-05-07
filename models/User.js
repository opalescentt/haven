import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  role: {
    type: String,
    enum: ["test_user", "Licensed Kinship Caregiver", "Amara Staff"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
