import connectdb from "../../../database/connectdb";
import Bio from "../../../models/bioModal";
import ProfilePic from "../../../models/profilepicModel";
import User from "../../../models/userModal";
import Match from "../../../models/matchesModel";
import MatchHistory from "../../../models/matchHistoryModel";

export async function GET() {
  try {
    await connectdb();

    const now = new Date();
const expireTime = 7 * 24 * 60 * 60 * 1000; // 7 days
    const expireDate = new Date(now.getTime() - expireTime);

    // 1. Load old matches to delete them, but archive to history first
    const oldMatches = await Match.find({ createdAt: { $lt: expireDate } });

    for (const match of oldMatches) {
      await MatchHistory.create({
        email1: match.user1.email,
        email2: match.user2.email,
        createdAt: match.createdAt,
      });
      await Match.deleteOne({ _id: match._id });
    }

    // 2. Load active matches (not deleted)
    const activeMatches = await Match.find().lean();

    // 3. Build pairing maps
    const activePairsMap = {};
    const historyPairsMap = {};

    // From MatchHistory
    const matchHistory = await MatchHistory.find().lean();
    for (const record of matchHistory) {
      const u1 = record.email1;
      const u2 = record.email2;
      if (!historyPairsMap[u1]) historyPairsMap[u1] = new Set();
      if (!historyPairsMap[u2]) historyPairsMap[u2] = new Set();
      historyPairsMap[u1].add(u2);
      historyPairsMap[u2].add(u1);
    }

    // From Active Matches
    const currentlyMatchedEmails = new Set();
    for (const match of activeMatches) {
      const u1 = match.user1.email;
      const u2 = match.user2.email;

      currentlyMatchedEmails.add(u1);
      currentlyMatchedEmails.add(u2);

      if (!activePairsMap[u1]) activePairsMap[u1] = new Set();
      if (!activePairsMap[u2]) activePairsMap[u2] = new Set();

      activePairsMap[u1].add(u2);
      activePairsMap[u2].add(u1);
    }

    // 4. Load user data
    const users = await User.find().lean();
    const bios = await Bio.find().lean();
    const pics = await ProfilePic.find().lean();

    const bioByEmail = {};
    const picByEmail = {};
    const userByEmail = {};

    bios.forEach((bio) => {
      bioByEmail[bio.user] = bio;
    });

    pics.forEach((pic) => {
      picByEmail[pic.user] = pic;
    });

    users.forEach((user) => {
      userByEmail[user.email] = user;
    });

    const isValidProfile = (bio, pic) =>
      bio &&
      bio.username &&
      bio.gender &&
      bio.age !== undefined &&
      bio.location &&
      pic?.url;

    const newPairs = [];

    // 5. Try to pair unmatched users
    for (const user of users) {
      const email = user.email;
      if (currentlyMatchedEmails.has(email)) continue;

      const bio = bioByEmail[email];
      const pic = picByEmail[email];
      if (!isValidProfile(bio, pic)) continue;

      const oppositeGender = bio.gender === "Male" ? "Female" : "Male";
      const historyPartners = historyPairsMap[email] || new Set();
      const activePartners = activePairsMap[email] || new Set();

      // 5a. Try new, never-before matched
      let partner = bios.find(
        (b) =>
          b.user !== email &&
          !currentlyMatchedEmails.has(b.user) &&
          b.gender === oppositeGender &&
          b.age === bio.age &&
          b.location === bio.location &&
          isValidProfile(b, picByEmail[b.user]) &&
          !historyPartners.has(b.user)
      );

      // 5b. Fallback: allow rematch (not active but in history)
      if (!partner) {
        partner = bios.find(
          (b) =>
            b.user !== email &&
            !currentlyMatchedEmails.has(b.user) &&
            b.gender === oppositeGender &&
            b.age === bio.age &&
            b.location === bio.location &&
            isValidProfile(b, picByEmail[b.user]) &&
            historyPartners.has(b.user) &&
            !activePartners.has(b.user)
        );
      }

      if (partner) {
        const partnerUser = userByEmail[partner.user];
        const partnerPic = picByEmail[partner.user];
        if (partnerUser && partnerPic?.url) {
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
              name: partnerUser.name,
              email: partner.user,
              username: partner.username,
              gender: partner.gender,
              age: partner.age,
              location: partner.location,
              image: partnerPic.url,
            },
          };

          await Match.create({
            user1: pair.user1,
            user2: pair.user2,
            createdAt: now,
          });

          newPairs.push(pair);
          currentlyMatchedEmails.add(email);
          currentlyMatchedEmails.add(partner.user);
        }
      }
    }

    // 6. Re-fetch updated active matches (including newly created)
    const updatedMatches = await Match.find().lean();
    const responsePairs = updatedMatches.map(({ user1, user2 }) => ({ user1, user2 }));

    return new Response(JSON.stringify(responsePairs), {
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
