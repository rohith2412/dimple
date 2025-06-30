"use client";

import Background from "@/app/components/Background";
import Gears from "@/app/components/Gear";
import InfoNotice from "@/app/components/InfoNotice";
import Navbar from "@/app/components/Navbar";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import LoadingSpinner from "./LoadingSpinner";

const formatLocation = (loc) => {
  if (!loc || typeof loc !== "string") return "Unknown Location";
  const parts = loc.split(",").map((s) => s.trim());
  return parts.length === 2 ? `${parts[1]}, ${parts[0].toUpperCase()}` : loc;
};

// Type guard equivalent - just a runtime check function
function isMatchedUser(user) {
  if (typeof user !== "object" || user === null) return false;
  return typeof user.email === "string" && typeof user.username === "string";
}

export default function MatchesPage() {
  const { data: session } = useSession();
  const [pairs, setPairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPairs() {
      try {
        setError(null);
        const currentUserEmail = session?.user?.email;

        const res = await fetch(`/api/matchable-profiles`);
        if (!res.ok) throw new Error(`Pairs fetch failed: ${res.status}`);

        const json = await res.json();

        const pairsData = Array.isArray(json)
          ? json
          : json.pairs || json.data || [];

        // Filter valid pairs
        const validPairs = pairsData.filter((pair) => {
          if (typeof pair !== "object" || pair === null) return false;
          if (!pair.user1 || !pair.user2) return false;
          return isMatchedUser(pair.user1) && isMatchedUser(pair.user2);
        });

        // Sort so pairs with current user come first
        const sortedPairs = [...validPairs].sort((a, b) => {
          const aMatch =
            a.user1.email === currentUserEmail ||
            a.user2.email === currentUserEmail;
          const bMatch =
            b.user1.email === currentUserEmail ||
            b.user2.email === currentUserEmail;
          return Number(bMatch) - Number(aMatch);
        });

        setPairs(sortedPairs);
      } catch (err) {
        setError(err.message || "Unknown error");
        setPairs([]);
      } finally {
        setLoading(false);
      }
    }

    if (session?.user?.email) {
      fetchPairs();
    }
  }, [session]);

  if (loading) {
    return <div className="text-white flex justify-center p-8"><LoadingSpinner /></div>;
  }

  if (error) {
    return (
      <>
        
        <div className="text-white flex justify-center items-center min-h-screen">
          <div className="text-center">
            <div className="text-xl text-red-600 mb-2">
              Error loading matches
            </div>
            <div className="text-sm text-gray-600">{error}</div>
          </div>
        </div>
      </>
    );
  }

  if (!Array.isArray(pairs) || pairs.length === 0) {
    return (
      <>
        <div className="text-white flex justify-center items-center min-h-screen">
          <div className="text-center">
            <div className="text-xl mb-2">No matches found</div>
            <div className="text-sm text-white">
              Check back later for new AI-generated pairs!
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="flex justify-center text-white items-center pt-10 text-xl">
          AI generated pairs ❤️
        </div>
        <div className="flex justify-center pt-10">
          <InfoNotice />
        </div>
      </div>
      <div className="flex justify-center text-gray-500 items-center text-xs pt-5">
        {pairs.length} matches
      </div>

      <div>

      <div className="text-white Poppins grid justify-center items-center p-6">
        <div className="w-full max-w-4xl mx-auto space-y-4 ">
          {pairs.map((pair, index) => (
            <div
              key={`${pair.user1.email}-${pair.user2.email}-${index}`}
              className="flex w-full mb-4 p-3 relative rounded-[10px] bg-white/3 border border-white/10 backdrop-blur-[40px] shadow-[0_20px_40px_rgba(0,0,0,0.25)] items-center"
            >
              {/* User 1 */}
              <Link
                href={`/client/view/${encodeURIComponent(pair.user1.email)}`}
                className="flex gap-3 items-center w-1/2 hover:opacity-80 transition-opacity"
              >
                <Image
                  src={pair.user1.image || "/default-avatar.png"}
                  alt={pair.user1.username || "User"}
                  width={56}
                  height={56}
                  className="w-14 h-14 aspect-square rounded-full object-cover"
                />

                <div className="truncate">
                  <p className="text-sm text-left font-medium">
                    {pair.user1.username || "Unknown User"}
                  </p>
                  <p className="text-xs text-left text-gray-400 whitespace-nowrap overflow-hidden text-ellipsis">
                    {formatLocation(pair.user1.location)}
                  </p>
                </div>
              </Link>

              {/* Heart Icon */}
              <div className="flex items-center justify-center">
                <svg
                  viewBox="0 0 512 512"
                  width="25"
                  height="25"
                  className="animate-pulse drop-shadow-lg"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <radialGradient
                      id={`glow-${index}`}
                      cx="50%"
                      cy="50%"
                      r="50%"
                    >
                      <stop offset="0%" stopColor="#ff6ec4" />
                      <stop offset="100%" stopColor="#7873f5" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <circle
                    cx="256"
                    cy="256"
                    r="130"
                    fill={`url(#glow-${index})`}
                  />
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
                    {pair.user2.username || "Unknown User"}
                  </p>
                  <p className="text-xs text-right text-gray-400 whitespace-nowrap overflow-hidden text-ellipsis">
                    {formatLocation(pair.user2.location)}
                  </p>
                </div>
                <Image
                  src={pair.user2.image || "/default-avatar.png"}
                  alt={pair.user2.username || "User"}
                  width={56}
                  height={56}
                  className="w-14 h-14 aspect-square rounded-full object-cover"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
      </div>

      <Gears />
    </>
  );
}

// Helper component to handle image fallback with next/image
function ImageWithFallback({ src, alt, width, height, className }) {
  const [imgSrc, setImgSrc] = React.useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setImgSrc("/default-avatar.png")}
      unoptimized
      priority
    />
  );
}
``