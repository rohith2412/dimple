// pages/api/user/[email].ts

import { NextRequest, NextResponse } from "next/server";
import connectdb from "@/database/connectdb";
import User from "@/models/userModal";
import Bio from "@/models/bioModal";
import ProfilePic from "@/models/profilepicModel";

export async function GET(req: NextRequest, { params }: { params: { email: string } }) {
  await connectdb();

  try {
    const { email } = params;

    const user = await User.findOne({ email }).select("name email image -_id");
    const bio = await Bio.findOne({ user: email }).select("-_id -__v -createdAt -updatedAt");
    const profilePics = await ProfilePic.find({ user: email }).select("url filename -_id");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user, bio, profilePics });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
