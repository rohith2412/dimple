import { NextResponse } from "next/server";
import connectdb from "../../../database/connectdb";

import Contact from "../../../models/contactModel"

export async function POST(req) {

    const { user, contact } = await req.json(); 

    if (!user || !contact) {
      return NextResponse.json(
        { error: "Missing user or contact" },
        { status: 400 }
      );
    }

    await connectdb();

    const contactdoc = await Contact.create({ user, contact });

    return NextResponse.json(contactdoc);

}
