
import connectdb from "@/database/connectdb";
import Bio from "@/models/bioModal";
import ProfilePic from "@/models/profilepicModel";
import User from "@/models/userModal";

export async function GET() {
  try {
    await connectdb();

    const users = await User.find().lean(); // Get all users
    const usedEmails = new Set<string>();
    const pairs = [];

    for (const user of users) {
      const email = user.email;
      if (usedEmails.has(email)) continue;

      // Get bio and profile pic for user
      const bio = await Bio.findOne({ user: email }).lean();
      const pic = await ProfilePic.findOne({ user: email }).lean();

      if (
        !bio ||
        !bio.username ||
        !bio.gender ||
        !bio.age ||
        !bio.location ||
        !pic?.url
      ) {
        // Missing required data, skip
        continue;
      }

      const oppositeGender = bio.gender === "Male" ? "Female" : "Male";

      // Find a match for the user
      const match = await Bio.findOne({
        user: { $ne: email },
        gender: oppositeGender,
        age: bio.age,
        location: bio.location,
      }).lean();

      if (
        match &&
        !usedEmails.has(match.user) &&
        match.username &&
        match.gender &&
        match.age &&
        match.location
      ) {
        const matchUser = await User.findOne({ email: match.user }).lean();
        const matchPic = await ProfilePic.findOne({ user: match.user }).lean();

        if (matchUser && matchPic?.url) {
          pairs.push({
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
          });

          // Mark both as used
          usedEmails.add(email);
          usedEmails.add(match.user);
        }
      }
    }

    return new Response(JSON.stringify(pairs), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error in matching users:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
