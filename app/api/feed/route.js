import { NextResponse } from "next/server";
import connectdb from "@/database/connectdb";
import Photo from "@/models/photoModel";
import Bio from "@/models/bioModal";

export async function GET() {
  await connectdb();

  try {
    const photos = await Photo.find({}).select("-__v -createdAt -updatedAt");

    const results = await Promise.all(
      photos.map(async (photo) => {
        const bio = await Bio.findOne({ user: photo.user }).select("username -_id");

        return {
          photo,
          username: bio?.username || "Unknown",
        };
      })
    );

    return NextResponse.json(results);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
