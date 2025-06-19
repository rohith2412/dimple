import connectdb from "@/database/connectdb";
import Bio from "@/models/bioModal";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userEmail = url.searchParams.get("user");
  if (!userEmail) {
    return new Response("User email required", { status: 400 });
  }

  await connectdb();

  const bio = await Bio.findOne({ user: userEmail }).lean();
  if (!bio) {
    return new Response(JSON.stringify({ username: null }), { status: 200 });
  }

  return new Response(JSON.stringify({ username: bio.username || null }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
