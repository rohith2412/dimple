import { NextResponse } from 'next/server';
import connectdb from "../../../database/connectdb";
import ProfilePic from "../../../models/profilepicModel"

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const user = searchParams.get('user');

  if (!user) {
    return NextResponse.json({ error: 'User email required' }, { status: 400 });
  }

  await connectdb();
  const profile = await ProfilePic.findOne({ user });

  if (!profile) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ url: profile.url });
}
