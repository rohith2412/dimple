import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import os from "os";
import path from "path";
import connectdb from "../../../database/connectdb";
import Photo from "../../../models/photoModel";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get("file");
    const user = data.get("user")?.toString();

    if (!file || !user) {
      return NextResponse.json({ error: "Missing file or user" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const tempPath = path.join(os.tmpdir(), file.name);
    await fs.promises.writeFile(tempPath, buffer);

    await connectdb();

    const result = await cloudinary.uploader.upload(tempPath, {
      transformation: [{ quality: "auto" }, { fetch_format: "auto" }],
    });

    await fs.promises.unlink(tempPath);

    const saved = await Photo.findOneAndUpdate(
      { user },
      {
        url: result.secure_url,
        filename: result.original_filename,
        user,
      },
      { upsert: true, new: true }
    );

    return NextResponse.json(saved);
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
