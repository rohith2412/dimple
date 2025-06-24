// pages/api/public-profile.ts

import { NextResponse } from "next/server";
import connectdb from "@/database/connectdb";
import User from "@/models/userModal";
import Bio from "@/models/bioModal";
import ProfilePic from "@/models/profilepicModel";
import Photo from "@/models/photoModel";

export async function GET() {
  await connectdb();

  try {
    const users = await User.find({}).select("name email image -_id");

    const results = await Promise.all(
      users.map(async (user) => {
        const bio = await Bio.findOne({ user: user.email }).select("-_id -__v -createdAt -updatedAt");
        const profilePics = await ProfilePic.find({ user: user.email }).select("url filename -_id");
        const photo = await Photo.find({ user: user.email }).select("url filename -_id");

        if (profilePics.length === 0 || !bio?.username) return null;

        return {
          user,
          bio,
          profilePics,
          photo,
        };
      })
    );

    // Filter out null results
    const filteredResults = results.filter((item) => item !== null);

    return NextResponse.json(filteredResults);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
