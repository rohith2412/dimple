// pages/api/public-profile.ts (or .js)

import type { NextApiRequest, NextApiResponse } from "next";

import ProfilePic from "@/models/profilepicModel";
import User from "@/models/userModal";
import Bio from "@/models/bioModal";
import { NextRequest, NextResponse } from "next/server";
import connectdb from "@/database/connectdb";
import Photo from "@/models/photoModel";


export async function GET() {
  await connectdb();

  try {
    // Get all users
    const users = await User.find({}).select("name email image -_id");

    // For each user, fetch bio and profile pics
    const results = await Promise.all(
      users.map(async (user) => {
        const bio = await Bio.findOne({ user: user.email }).select("-_id -__v -createdAt -updatedAt");
        const profilePics = await ProfilePic.find({ user: user.email }).select("url filename -_id");
        const photo = await Photo.find({ user: user.email }).select("url filename -_id");
 
        return {
          user,
          bio,
          profilePics,
          photo
        };
      })
    );

    return NextResponse.json(results);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}