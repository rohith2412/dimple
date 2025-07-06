import { NextResponse } from "next/server";
import connectdb from "../../../database/connectdb";
import Photo from "../../../models/photoModel";

export async function GET(req) {
  try {
    const user = req.nextUrl.searchParams.get("user");

    if (!user) {
      return NextResponse.json({ error: "User email required" }, { status: 400 });
    }

    await connectdb();

    const profile = await Photo.findOne({ user });

    if (!profile) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ url: profile.url });
  } catch (err) {
    console.error("GET /api/photo error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
