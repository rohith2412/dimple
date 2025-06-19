import connectdb from "@/database/connectdb";
import ProfilePic from "@/models/profilepicModel";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userEmail = url.searchParams.get("user");
  if (!userEmail) {
    return new Response("User email required", { status: 400 });
  }

  await connectdb();

  const pic = await ProfilePic.findOne({ user: userEmail }).lean();
  if (!pic) {
    return new Response(JSON.stringify({ url: null }), { status: 200 });
  }

  return new Response(JSON.stringify({ url: pic.url || null }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
