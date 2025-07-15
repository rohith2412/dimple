import connectdb from "../../../database/connectdb";
import Bio from "../../../models/bioModal";
import ProfilePic from "../../../models/profilepicModel";
import User from "../../../models/userModal";
import Match from "../../../models/matchesModel";
import MatchMeta from "../../../models/matchMetaModel";

export async function GET() {
  try {
    await connectdb();

    // 🕒 Load or create meta doc to track last matching
    let meta = await MatchMeta.findOne();
    if (!meta) {
      meta = await MatchMeta.create({ lastMatchedAt: new Date() });
    }

    const now = new Date();
    const nextReset = new Date(meta.lastMatchedAt);
    nextReset.setDate(nextReset.getDate() + 7);

    // Fetch existing matches
    let existingMatches = await Match.find().lean();

    // ⏳ If within the 7-day window, just return current matches
    if (now < nextReset) {
      return new Response(
        JSON.stringify({ matches: existingMatches, nextReset }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // 🔁 Time to rematch: clear and recreate matches
    await Match.deleteMany();

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
    const newMatches = [];

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
          newMatches.push(pair);
          used.add(email);
          used.add(match.user);
        }
      }
    }

    // Update timer
    meta.lastMatchedAt = new Date();
    await meta.save();

    return new Response(
      JSON.stringify({ matches: newMatches, nextReset }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error in matching:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
