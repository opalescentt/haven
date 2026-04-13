import Event from "@/models/Event";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  await connectDB();
  const events = await Event.find({}).lean();
  return Response.json(events);
}
