"use client";

import { Background } from "@/app/components/Background";
import Gears from "@/app/components/Gear";
import InfoNotice from "@/app/components/InfoNotice ";
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
  if (!loc || typeof loc !== 'string') return 'Unknown Location';
  const parts = loc.split(",").map((s) => s.trim());
  return parts.length === 2 ? `${parts[1]}, ${parts[0].toUpperCase()}` : loc;
};

export default function MatchesPage() {
  const [pairs, setPairs] = useState<Pair[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPairs() {
      try {
        setError(null);
        
        // Fetch pairs directly (API will handle session internally)
        const res = await fetch(`/api/matchable-profiles`);
        if (!res.ok) {
          throw new Error(`Pairs fetch failed: ${res.status}`);
        }
        
        const json = await res.json();
        console.log("Raw API response:", json);

        // Handle different response formats
        let pairsData: Pair[] = [];
        
        if (Array.isArray(json)) {
          pairsData = json;
        } else if (json.pairs && Array.isArray(json.pairs)) {
          pairsData = json.pairs;
        } else if (json.data && Array.isArray(json.data)) {
          pairsData = json.data;
        } else {
          console.error("Unexpected response format:", json);
          setError("Unexpected response format from server");
          setLoading(false);
          return;
        }

        // Validate and filter pairs
        const validPairs = pairsData.filter((pair: any) => {
          // Check if pair has required structure
          if (!pair || typeof pair !== 'object') {
            console.warn("Invalid pair object:", pair);
            return false;
          }
          
          // Check if both users exist
          if (!pair.user1 || !pair.user2) {
            console.warn("Missing user in pair:", pair);
            return false;
          }
          
          // Check if users have required fields
          const requiredFields = ['email', 'username'];
          const user1Valid = requiredFields.every(field => pair.user1[field]);
          const user2Valid = requiredFields.every(field => pair.user2[field]);
          
          if (!user1Valid || !user2Valid) {
            console.warn("Users missing required fields:", pair);
            return false;
          }
          
          return true;
        });

        console.log(`Filtered ${validPairs.length} valid pairs from ${pairsData.length} total`);
        setPairs(validPairs);
        
      } catch (err) {
        console.error("Error fetching session or matched pairs:", err);
        setError(err instanceof Error ? err.message : "Unknown error occurred");
        setPairs([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPairs();
  }, []);

  if (loading) {
    return (
      <div className="text-black flex justify-center items-center p-30 ">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-black flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="text-xl text-red-600 mb-2">Error loading matches</div>
          <div className="text-sm text-gray-600">{error}</div>
        </div>
      </div>
    );
  }

  if (!Array.isArray(pairs) || pairs.length === 0) {
    return (
      <>
        <Background />
        <Navbar />
        <div className="text-black flex justify-center items-center min-h-screen">
          <div className="text-center">
            <div className="text-xl mb-2">No matches found</div>
            <div className="text-sm text-gray-600">
              Check back later for new AI-generated pairs!
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Background />
      <Navbar />
      <div className="flex justify-center items-center">
        <div className="flex justify-center items-center pt-10 text-xl">
          AI generated pairs ❤️ 
        </div>
        <div className="flex justify-center pt-10">
          <InfoNotice />
        </div>
      </div>
      <div className="flex justify-center items-center text-xs pt-5">
      {pairs.length} matches
      </div>

      <div className="text-black Poppins grid justify-center items-center p-6">
        <div className="w-full max-w-4xl mx-auto space-y-4">
          {pairs.map((pair, index) => (
            <div
              key={`${pair.user1.email}-${pair.user2.email}-${index}`}
              className="flex w-full p-4 rounded-xl shadow-md gap-4 bg-white"
            >
              {/* User 1 */}
              <Link
                href={`/client/view/${encodeURIComponent(pair.user1.email)}`}
                className="flex gap-3 items-center w-1/2 hover:opacity-80 transition-opacity"
              >
                <img
                  src={pair.user1.image || '/default-avatar.png'}
                  alt={pair.user1.username || 'User'}
                  className="w-14 h-14 rounded-full object-cover aspect-square"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/default-avatar.png';
                  }}
                />
                <div className="truncate">
                  <p className="text-sm text-left font-medium">
                    {pair.user1.username || 'Unknown User'}
                  </p>
                  <p className="text-xs text-left text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis">
                    {formatLocation(pair.user1.location)}
                  </p>
                  
                </div>
              </Link>

              {/* Icon */}
              <div className="flex items-center justify-center">
                <svg
                  viewBox="0 0 512 512"
                  width="25"
                  height="25"
                  className="animate-pulse drop-shadow-lg"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <radialGradient id={`glow-${index}`} cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ff6ec4" />
                      <stop offset="100%" stopColor="#7873f5" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <circle cx="256" cy="256" r="130" fill={`url(#glow-${index})`} />
                  <path
                    d="M256 464s-192-112-192-272c0-70.7 57.3-128 128-128 41.2 0 77.8 20.1 100 51.3C314.2 84.1 350.8 64 392 64c70.7 0 128 57.3 128 128 0 160-192 272-192 272s-9.4 6-32 6-32-6-32-6z"
                    fill="#ff6ec4"
                  />
                </svg>
              </div>

              {/* User 2 */}
              <Link
                href={`/client/view/${encodeURIComponent(pair.user2.email)}`}
                className="flex gap-3 items-center w-1/2 justify-end text-right hover:opacity-80 transition-opacity"
              >
                <div className="truncate">
                  <p className="text-sm text-right font-medium">
                    {pair.user2.username || 'Unknown User'}
                  </p>
                  <p className="text-xs text-right text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis">
                    {formatLocation(pair.user2.location)}
                  </p>
                  
                </div>
                <img
                  src={pair.user2.image || '/default-avatar.png'}
                  alt={pair.user2.username || 'User'}
                  className="w-14 h-14 rounded-full object-cover aspect-square"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/default-avatar.png';
                  }}
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