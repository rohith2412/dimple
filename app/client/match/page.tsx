"use client";

import { Background } from "@/app/components/Background";
import Gears from "@/app/components/Gear";
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

export default function MatchesPage() {
    <Background />
  const [pairs, setPairs] = useState<Pair[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPairs() {
      try {
        const res = await fetch("/api/matchable-profiles");
        const data = await res.json();
        console.log("Pairs fetched:", data.length);
        setPairs(data);
      } catch (err) {
        console.error("Failed to fetch matched pairs", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPairs();
  }, []);

  if (loading) return <div className="text-white p-6">Matching users...</div>;

  if (pairs.length === 0)
    return (
      <div className="text-gray-400 text-center p-6">
        No valid matched pairs found.
      </div>
    );

  return (
    <div className="text-white p-6 max-w-7xl mx-auto grid gap-6">
      {pairs.map((pair, index) => (
        <div
          key={index}
          className="bg-gray-800 rounded-xl p-6 shadow-lg flex flex-col md:flex-row justify-between gap-6"
        >
          <h2 className="text-xl font-bold text-center w-full">
            Pair #{index + 1}
          </h2>

          {[pair.user1, pair.user2].map((user, i) => (
            <div
              key={i}
              className="flex-1 flex flex-col items-center text-center"
            >
              <img
                src={user.image}
                alt={user.username}
                className="w-24 h-24 rounded-full object-cover mb-2 border-2 border-white"
              />
              <p className="text-lg font-semibold">{user.username}</p>
              <p className="text-sm text-gray-300">
                {user.gender}, Age {user.age}
              </p>
              <p className="text-sm text-gray-400">{user.location}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          ))}
        </div>
      ))}
      <Gears />
    </div>
  );
}
