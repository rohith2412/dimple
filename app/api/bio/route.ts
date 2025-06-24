
import connectdb from "@/database/connectdb";
import Bio from "@/models/bioModal";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userEmail = req.nextUrl.searchParams.get("user");
    if (!userEmail) {
      return new NextResponse("User email is required", { status: 400 });
    }

    await connectdb();
    const bio = await Bio.findOne({ user: userEmail });

    if (!bio) {
      return NextResponse.json({ error: "Bio not found" }, { status: 404 });
    }

    return NextResponse.json(bio);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { user, job, age, location, gender, username, bio } = await req.json();

    if (!user) {
      return new NextResponse("User email is required", { status: 400 });
    }

    await connectdb();

    const bioForm = await Bio.findOneAndUpdate(
      { user }, 
      { job, age, location, gender, username, bio },
      { new: true, upsert: true }
    );

    return NextResponse.json(bioForm);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
