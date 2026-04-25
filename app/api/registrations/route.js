// app/api/registrations/route.js
//
// GET  /api/registrations        → returns the current user's registered event IDs
// POST /api/registrations        → registers the user for an event  { eventId }
// DELETE /api/registrations      → unregisters the user from an event  { eventId }

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // adjust path if needed
import { connectDB } from "@/lib/mongodb";
import Registration from "@/models/Registration"; // Optional: Create a Mongoose model for registrations

export async function GET(req) {
  await connectDB(); // Ensure MongoDB connection is established

  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Fetch registrations using Mongoose
  const registrations = await Registration.find({ userEmail: session.user.email }).lean();

  // Return an array of { eventId } objects so the frontend can build its Set
  return Response.json(registrations.map((r) => ({ eventId: r.eventId })));
}

export async function POST(req) {
  await connectDB(); // Ensure MongoDB connection is established

  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { eventId } = await req.json();
  if (!eventId) {
    return Response.json({ error: "eventId required" }, { status: 400 });
  }

  // Upsert registration using Mongoose
  await Registration.updateOne(
    { userEmail: session.user.email, eventId },
    { $set: { userEmail: session.user.email, eventId, registeredAt: new Date() } },
    { upsert: true }
  );

  return Response.json({ ok: true });
}

export async function DELETE(req) {
  await connectDB(); // Ensure MongoDB connection is established

  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { eventId } = await req.json();
  if (!eventId) {
    return Response.json({ error: "eventId required" }, { status: 400 });
  }

  // Delete registration using Mongoose
  await Registration.deleteOne({
    userEmail: session.user.email,
    eventId,
  });

  return Response.json({ ok: true });
}