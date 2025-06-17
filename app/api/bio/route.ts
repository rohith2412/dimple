// /app/api/bio/route.ts
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
      return new NextResponse("Bio not found", { status: 404 });
    }

    return NextResponse.json(bio);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { user, job, age, location, phone, username } = await req.json();

    if (!user) {
      return new NextResponse("User email is required", { status: 400 });
    }

    await connectdb();

    const bio = await Bio.findOneAndUpdate(
      { user }, // email
      { job, age, location, phone, username },
      { new: true, upsert: true }
    );

    return NextResponse.json(bio);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
