import connectdb from "../../../database/connectdb";
import Bio from "../../../models/bioModal";
import ProfilePic from "../../../models/profilepicModel";
import User from "../../../models/userModal";
import Match from "../../../models/matchesModel";
import MatchMeta from "../../../models/matchMetaModel";

async function matchableprofiles(email) {
  // Find bio of new user
  const bio = await Bio.findOne({ user: email }).lean();
  if (!bio || !bio.username || !bio.gender || !bio.age || !bio.location) return;

  const oppositeGender = bio.gender === "Male" ? "Female" : "Male";

  // Find a suitable match (opposite gender, same age, location)
  const match = await Bio.findOne({
    user: { $ne: email },
    gender: oppositeGender,
    age: bio.age,
    location: bio.location,
  }).lean();

  if (!match) return;

  // Check if new user or matched user is already in a match
  const existingMatch = await Match.findOne({
    $or: [
      { "user1.email": email },
      { "user2.email": email },
      { "user1.email": match.user },
      { "user2.email": match.user },
    ],
  });

  if (existingMatch) return; // Already matched, skip

  // Get user details and pics
  const userDoc = await User.findOne({ email });
  const matchUserDoc = await User.findOne({ email: match.user });
  const pic = await ProfilePic.findOne({ user: email });
  const matchPic = await ProfilePic.findOne({ user: match.user });

  if (!userDoc || !matchUserDoc || !pic?.url || !matchPic?.url) return;

  // Create new match
  await Match.create({
    user1: {
      name: userDoc.name,
      email,
      username: bio.username,
      gender: bio.gender,
      age: bio.age,
      location: bio.location,
      image: pic.url,
    },
    user2: {
      name: matchUserDoc.name,
      email: match.user,
      username: match.username,
      gender: match.gender,
      age: match.age,
      location: match.location,
      image: matchPic.url,
    },
  });
}

export async function GET() {
  try {
    await connectdb();

    // Load or create match meta to check last match time
    let meta = await MatchMeta.findOne();
    if (!meta) {
      meta = await MatchMeta.create({ lastMatchedAt: new Date() });
    }

    const now = new Date();
    const nextReset = new Date(meta.lastMatchedAt);
    nextReset.setDate(nextReset.getDate() + 7);

    // If 7 days haven't passed, just return existing matches
    if (now < nextReset) {
      const matches = await Match.find().lean();
      return new Response(JSON.stringify({ matches, nextReset }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Otherwise, it's time to re-match all users:
    // Delete old matches
    await Match.deleteMany({});

    // Load all users, bios, pics
    const users = await User.find().lean();
    const bios = await Bio.find().lean();
    const pics = await ProfilePic.find().lean();

    const bioByUser = {};
    const picByUser = {};
    const userByEmail = {};

    bios.forEach((b) => (bioByUser[b.user] = b));
    pics.forEach((p) => (picByUser[p.user] = p));
    users.forEach((u) => (userByEmail[u.email] = u));

    const used = new Set();
    const pairs = [];

    for (const user of users) {
      const email = user.email;
      if (used.has(email)) continue;

      const bio = bioByUser[email];
      const pic = picByUser[email];

      if (!bio || !bio.username || !bio.gender || !bio.age || !bio.location || !pic?.url) continue;

      const oppositeGender = bio.gender === "Male" ? "Female" : "Male";

      const match = bios.find(
        (b) =>
          b.user !== email &&
          b.gender === oppositeGender &&
          b.age === bio.age &&
          b.location === bio.location &&
          !used.has(b.user)
      );

      if (match) {
        const matchUser = userByEmail[match.user];
        const matchPic = picByUser[match.user];

        if (matchUser && matchPic?.url) {
          const pair = {
            user1: {
              name: user.name,
              email,
              username: bio.username,
              gender: bio.gender,
              age: bio.age,
              location: bio.location,
              image: pic.url,
            },
            user2: {
              name: matchUser.name,
              email: match.user,
              username: match.username,
              gender: match.gender,
              age: match.age,
              location: match.location,
              image: matchPic.url,
            },
          };

          await Match.create(pair);
          pairs.push(pair);
          used.add(email);
          used.add(match.user);
        }
      }
    }

    // Update last matched timestamp
    meta.lastMatchedAt = new Date();
    await meta.save();

    return new Response(JSON.stringify({ matches: pairs, nextReset }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Match Error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

export { matchableprofiles };
