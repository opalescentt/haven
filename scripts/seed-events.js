import mongoose from "mongoose";
import fs from "fs";
import { connectDB } from "../lib/mongodb.js";
import Event from "../models/Event.js";

const data = JSON.parse(fs.readFileSync("events.json", "utf8"));
const allEvents = [
  ...(data.tsgs ?? []),
  ...(data.specialevents ?? []),
  ...(data.regionalevents ?? []),
].filter(Boolean);

await connectDB();

await Event.deleteMany({});
await Event.insertMany(allEvents);

console.log(`Seeded ${allEvents.length} events.`);
await mongoose.disconnect();
