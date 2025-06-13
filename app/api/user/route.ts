import connectdb from "@/database/connectdb";
import User from "@/models/userModal";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const {name} = await req.json();
    await connectdb();
    const user = new User({
        name
    })
    await user.save()
    return NextResponse.json(user)
    } catch (error) {
        console.log(error)
    }
}

export async function GET(req: NextRequest) {
  try {
    await connectdb();
    const allUsers = await User.find(); // Get all users
    return NextResponse.json(allUsers);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}