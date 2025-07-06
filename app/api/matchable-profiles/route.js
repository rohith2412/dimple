import connectdb from "../../../database/connectdb";
import Bio from "../../../models/bioModal";
import ProfilePic from "../../../models/profilepicModel";
import User from "../../../models/userModal";
import Match from "../../../models/matchesModel";

export async function GET() {
  try {
    await connectdb();

    // Clear existing matches
    await Match.deleteMany({});

    // Fetch all data once
    const users = await User.find().lean();
    const bios = await Bio.find().lean();
    const pics = await ProfilePic.find().lean();

    // Create lookup maps for quick access
    const bioByUser = {};
    const picByUser = {};
    const userByEmail = {};

    bios.forEach((bio) => {
      bioByUser[bio.user] = bio;
    });

    pics.forEach((pic) => {
      picByUser[pic.user] = pic;
    });

    users.forEach((user) => {
      userByEmail[user.email] = user;
    });

    const usedEmails = new Set();
    const pairs = [];

    for (const user of users) {
      const email = user.email;
      if (usedEmails.has(email)) continue;

      const bio = bioByUser[email];
      const pic = picByUser[email];

      if (
        !bio ||
        !bio.username ||
        !bio.gender ||
        !bio.age ||
        !bio.location ||
        !pic?.url
      ) {
        continue;
      }

      const oppositeGender = bio.gender === "Male" ? "Female" : "Male";

      // Find a match with opposite gender, same age and location
      const match = bios.find(
        (b) =>
          b.user !== email &&
          b.gender === oppositeGender &&
          b.age === bio.age &&
          b.location === bio.location &&
          !usedEmails.has(b.user) &&
          b.username &&
          b.gender &&
          b.age &&
          b.location
      );

      if (match) {
        const matchUser = userByEmail[match.user];
        const matchPic = picByUser[match.user];

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

          await Match.create({
            user1: newPair.user1,
            user2: newPair.user2,
          });

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
