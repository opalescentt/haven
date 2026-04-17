import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  title: String,
  description: String,
  format: String,
  eventType: String,
  location: String,
  speaker: String,
  rsvp: String,
  date: [String],
  timeStart: String,
  timeEnd: String,
  url: String,
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Event || mongoose.model("Event", EventSchema);
