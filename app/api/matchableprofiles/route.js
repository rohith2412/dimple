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
    const expireTime = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    const expireDate = new Date(now.getTime() - expireTime);

    // 1. Load old matches to delete them, but archive to history first
    const oldMatches = await Match.find({ createdAt: { $lt: expireDate } });

    console.log(`Found ${oldMatches.length} expired matches to archive`);

    for (const match of oldMatches) {
      // Check if this pair already exists in history to avoid duplicates
      const existingHistory = await MatchHistory.findOne({
        $or: [
          { email1: match.user1.email, email2: match.user2.email },
          { email1: match.user2.email, email2: match.user1.email }
        ]
      });

      if (!existingHistory) {
        await MatchHistory.create({
          email1: match.user1.email,
          email2: match.user2.email,
          createdAt: match.createdAt,
        });
      }
      
      await Match.deleteOne({ _id: match._id });
    }

    // 2. Load active matches (not deleted)
    const activeMatches = await Match.find().lean();
    console.log(`Found ${activeMatches.length} active matches`);

    // 3. Build pairing maps
    const activePairsMap = {};
    const historyPairsMap = {};

    // From MatchHistory - build bidirectional mapping
    const matchHistory = await MatchHistory.find().lean();
    console.log(`Found ${matchHistory.length} historical matches`);
    
    for (const record of matchHistory) {
      const u1 = record.email1;
      const u2 = record.email2;
      if (!historyPairsMap[u1]) historyPairsMap[u1] = new Set();
      if (!historyPairsMap[u2]) historyPairsMap[u2] = new Set();
      historyPairsMap[u1].add(u2);
      historyPairsMap[u2].add(u1);
    }

    // From Active Matches - build bidirectional mapping
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
      if (currentlyMatchedEmails.has(email)) {
        console.log(`User ${email} is already matched, skipping`);
        continue;
      }

      const bio = bioByEmail[email];
      const pic = picByEmail[email];
      if (!isValidProfile(bio, pic)) {
        console.log(`User ${email} has invalid profile, skipping`);
        continue;
      }

      const oppositeGender = bio.gender === "Male" ? "Female" : "Male";
      const historyPartners = historyPairsMap[email] || new Set();
      const activePartners = activePairsMap[email] || new Set();

      console.log(`Looking for partner for ${email} (${bio.gender}, age ${bio.age}, location: ${bio.location})`);
      console.log(`History partners: ${Array.from(historyPartners)}`);

      // Find all potential partners with same criteria
      const potentialPartners = bios.filter(
        (b) =>
          b.user !== email &&
          !currentlyMatchedEmails.has(b.user) &&
          b.gender === oppositeGender &&
          b.age === bio.age &&
          b.location === bio.location &&
          isValidProfile(b, picByEmail[b.user])
      );

      console.log(`Found ${potentialPartners.length} potential partners for ${email}`);

      let partner = null;

      // 5a. PRIORITY: Try partners who have NEVER been matched before
      const neverMatchedPartners = potentialPartners.filter(
        (b) => !historyPartners.has(b.user)
      );

      if (neverMatchedPartners.length > 0) {
        // Pick the first available never-matched partner
        partner = neverMatchedPartners[0];
        console.log(`Found never-matched partner: ${partner.user} for ${email}`);
      } else {
        // 5b. FALLBACK: Only if no new partners available, allow rematch
        // But exclude currently active partners
        const rematchPartners = potentialPartners.filter(
          (b) => historyPartners.has(b.user) && !activePartners.has(b.user)
        );

        if (rematchPartners.length > 0) {
          // Pick the first available rematch partner
          partner = rematchPartners[0];
          console.log(`Found rematch partner: ${partner.user} for ${email}`);
        } else {
          console.log(`No suitable partner found for ${email}`);
        }
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

          console.log(`Creating match: ${email} <-> ${partner.user}`);
          
          await Match.create({
            user1: pair.user1,
            user2: pair.user2,
            createdAt: now,
          });

          newPairs.push(pair);
          currentlyMatchedEmails.add(email);
          currentlyMatchedEmails.add(partner.user);
        } else {
          console.log(`Missing user data for partner ${partner.user}`);
        }
      }
    }

    console.log(`Created ${newPairs.length} new pairs`);

    // 6. Re-fetch updated active matches (including newly created)
    const updatedMatches = await Match.find().lean();
    const responsePairs = updatedMatches.map(({ user1, user2 }) => ({ user1, user2 }));

    console.log(`Returning ${responsePairs.length} total active pairs`);

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