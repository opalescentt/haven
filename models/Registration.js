import mongoose from "mongoose";

const RegistrationSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  eventId: { type: String, required: true },
  registeredAt: { type: Date, default: Date.now },
});

export default mongoose.models.Registration || mongoose.model("Registration", RegistrationSchema);