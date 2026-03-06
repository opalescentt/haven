import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";

// Fetch user info
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  await connectDB();

  const dbUser = await User.findOne({ email: session.user.email });
  if (!dbUser) {
    return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
  }

  return new Response(JSON.stringify({ user: dbUser }), { status: 200 });
}

// Example POST endpoint for updating user info (optional)
export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  await connectDB();

  const dbUser = await User.findOne({ email: session.user.email });
  if (!dbUser) {
    return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
  }

  const body = await req.json();
  // Example: update user's role
  if (body.role) {
    dbUser.role = body.role;
    await dbUser.save();
  }

  return new Response(JSON.stringify({ user: dbUser }), { status: 200 });
}