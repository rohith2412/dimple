import { NextResponse } from "next/server";
import connectdb from "../../../database/connectdb";
import Bio from "../../../models/bioModal"


export async function GET(req) {
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

export async function POST(req) {
  try {
    const { user, job, age, location, gender, username, bio, connectURL } = await req.json();

    if (!user) {
      return new NextResponse("User email is required", { status: 400 });
    }

    await connectdb();

    const bioForm = await Bio.findOneAndUpdate(
      { user },
      { job, age, location, gender, username, bio, connectURL },
      { new: true, upsert: true }
    );

    return NextResponse.json(bioForm);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
