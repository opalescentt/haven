import { MongoClient } from "mongodb";

export async function POST(req) {
  const apiKey = req.headers.get("x-api-key");
  if (apiKey !== process.env.SYNC_API_KEY) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { fileName, fileContent } = body;

    // Parse fileContent if it's a string
    const rows =
      typeof fileContent === "string" ? JSON.parse(fileContent) : fileContent;

    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db("prod");
    const collection = db.collection("staff");

    // Clear existing and replace with fresh data
    await collection.deleteMany({});
    await collection.insertMany(rows);

    await client.close();

    return Response.json({ success: true, count: rows.length });
  } catch (err) {
    console.error(err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
