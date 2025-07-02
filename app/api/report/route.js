// app/api/report/route.js or /api/report/route.js
import { NextResponse } from "next/server";
import connectdb from "@/database/connectdb";
import Report from "@/models/reportModel";

export async function POST(req) {

    const { user, report } = await req.json(); // ✅ CORRECT FIELD NAME

    if (!user || !report) {
      return NextResponse.json(
        { error: "Missing user or report" },
        { status: 400 }
      );
    }

    await connectdb();

    const reportDoc = await Report.create({ user, report }); // ✅ USING `message`

    return NextResponse.json(reportDoc);

}
