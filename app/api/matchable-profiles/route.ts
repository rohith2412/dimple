import connectdb from "@/database/connectdb";
import Bio from "@/models/bioModal";
import ProfilePic from "@/models/profilepicModel";
import User from "@/models/userModal";
import Match from "@/models/matchesModel";

export async function GET() {
  try {
    await connectdb();

    // Step 1: Clear outdated matches (for simplicity, just clear all matches)
    // You can add logic here to selectively clear based on timestamps or profile changes
    await Match.deleteMany({});

    // Step 2: Fetch all users
    const users = await User.find().lean();
    const usedEmails = new Set<string>();
    const pairs = [];

    // Step 3: Match users fresh, push to pairs
    for (const user of users) {
      const email = user.email;
      if (usedEmails.has(email)) continue;

      const bio = await Bio.findOne({ user: email }).lean();
      const pic = await ProfilePic.findOne({ user: email }).lean();

      if (
        !bio ||
        !bio.username ||
        !bio.gender ||
        !bio.age ||
        !bio.location ||
        !pic?.url
      )
        continue;

      const oppositeGender = bio.gender === "Male" ? "Female" : "Male";

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
          const newPair = {
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

          pairs.push(newPair);

          // Save the new pair in DB cache
          await Match.create({
            user1: newPair.user1,
            user2: newPair.user2,
          });

          usedEmails.add(email);
          usedEmails.add(match.user);
        }
      }
    }

    // Step 4: Return fresh pairs
    return new Response(JSON.stringify(pairs), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error in matching users:", err);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
