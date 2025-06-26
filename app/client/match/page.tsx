"use client";

import { Background } from "@/app/components/Background";
import Gears from "@/app/components/Gear";
import Navbar from "@/app/components/Navbar";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface MatchedUser {
  name: string;
  email: string;
  username: string;
  gender: string;
  age: number;
  location: string;
  image: string;
}

interface Pair {
  user1: MatchedUser;
  user2: MatchedUser;
}

const formatLocation = (loc: string) => {
  const parts = loc.split(",").map((s) => s.trim());
  return parts.length === 2 ? `${parts[1]}, ${parts[0].toUpperCase()}` : loc;
};

export default function MatchesPage() {
  const [pairs, setPairs] = useState<Pair[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSessionAndPairs() {
      try {
        const sessionRes = await fetch("/api/auth/session");
        const sessionData = await sessionRes.json();
        const email = sessionData?.user?.email;
        setUserEmail(email);

        const res = await fetch("/api/matchable-profiles");
        const data: Pair[] = await res.json();

        if (email) {
          const sortedPairs = [
            ...data.filter(
              (pair) => pair.user1.email === email || pair.user2.email === email
            ),
            ...data.filter(
              (pair) => pair.user1.email !== email && pair.user2.email !== email
            ),
          ];
          setPairs(sortedPairs);
        } else {
          setPairs(data);
        }
      } catch (err) {
        console.error("Error fetching session or matched pairs", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSessionAndPairs();
  }, []);

  if (loading)
    return (
      <div className="text-black flex justify-center p-30">Loading...</div>
    );

  if (pairs.length === 0)
    return (
      <div className="text-black flex justify-center p-30">
        No valid matched pairs found.
      </div>
    );

  return (
    <>
      <Background />
      <Navbar />
      <div className="flex justify-center items-center pt-10 text-xl">
        AI generated pairs ❤️
      </div>
      <div className="text-center flex justify-center text-xs text-gray-500">
        * This cycle will keep on changing every week
      </div>

      <div className="text-black Poppins grid justify-center items-center p-6">
        <div className="w-full max-w-4xl mx-auto space-y-4">
          {pairs.map((pair, index) => (
            <div
              key={index}
              className="flex w-full p-4 rounded-xl shadow-md gap-4"
            >
              {/* User 1 */}
              <Link
                href={`/client/view/${encodeURIComponent(pair.user1.email)}`}
                className="flex gap-3 items-center w-1/2"
              >
                <img
                  src={pair.user1.image}
                  alt={pair.user1.username}
                  className="w-14 h-14 rounded-full object-cover aspect-square"
                />

                <div className="truncate">
                  <p className="text-sm text-left">{pair.user1.username}</p>
                  <p className="text-xs text-left text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis">
                    {formatLocation(pair.user1.location)}
                  </p>
                </div>
              </Link>

              {/* Icon between */}
              <div className="flex items-center justify-center">
                <svg
                  viewBox="0 0 512 512"
                  width="25"
                  height="25"
                  className="animate-pulse drop-shadow-lg"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ff6ec4" />
                      <stop offset="100%" stopColor="#7873f5" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <circle cx="256" cy="256" r="130" fill="url(#glow)" />
                  <path
                    d="M256 464s-192-112-192-272c0-70.7 57.3-128 128-128 41.2 0 77.8 20.1 100 51.3C314.2 84.1 350.8 64 392 64c70.7 0 128 57.3 128 128 0 160-192 272-192 272s-9.4 6-32 6-32-6-32-6z"
                    fill="#ff6ec4"
                  />
                </svg>
              </div>

              {/* User 2 */}
              <Link
                href={`/client/view/${encodeURIComponent(pair.user2.email)}`}
                className="flex gap-3 items-center w-1/2 justify-end text-right"
              >
                <div className="truncate">
                  <p className="text-sm text-right">{pair.user2.username}</p>
                  <p className="text-xs text-right text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis">
                    {formatLocation(pair.user2.location)}
                  </p>
                </div>
                <img
                  src={pair.user2.image}
                  alt={pair.user2.username}
                  className="w-14 h-14 rounded-full object-cover aspect-square"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Gears />
    </>
  );
}
