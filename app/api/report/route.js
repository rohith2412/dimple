import { NextResponse } from "next/server";
import connectdb from "../../../database/connectdb";
import Report from "../../../models/reportModel";

export async function POST(req) {

    const { user, report } = await req.json(); 

    if (!user || !report) {
      return NextResponse.json(
        { error: "Missing user or report" },
        { status: 400 }
      );
    }

    await connectdb();

    const reportDoc = await Report.create({ user, report });

    return NextResponse.json(reportDoc);

}
