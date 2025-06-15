import connectdb from "@/database/connectdb";
import Bio from "@/models/bioModal";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { user, job, age, location, phone, username } = await req.json();
    await connectdb()
    const bio = await Bio.create({
        user,
        job,
        age, 
        location, 
        phone, 
        username
    })
    await bio.save()
    return NextResponse.json(bio)
  } catch (error) {
    console.log(error)
  }
}
