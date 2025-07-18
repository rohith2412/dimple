"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

export default function Alluser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/user")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((data) => {
        // Sort by newest first (assuming createdAt is a valid ISO string or timestamp)
        const sorted = data.sort((a, b) => {
          const aTime = new Date(
            a.bio?.createdAt || a.createdAt || 0
          ).getTime();
          const bTime = new Date(
            b.bio?.createdAt || b.createdAt || 0
          ).getTime();
          return bTime - aTime;
        });
        setUsers(sorted);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredUsers = users.filter(({ bio }) => {
    const username = bio?.username?.toLowerCase() ?? "";
    const location = bio?.location?.toLowerCase() ?? "";
    const job = bio?.job?.toLowerCase() ?? "";
    const searchTerm = search.toLowerCase();
    return username.includes(searchTerm) || location.includes(searchTerm);
  });

  if (loading)
    return <div className=""><LoadingSpinner /></div>;
  if (error)
    return (
      <div className="text-red-500 flex justify-center p-8">Error: {error}</div>
    );

  return (
    <div className="lg:grid grid lg:justify-center  justify-center ">
      <div className="flex items-center justify-center w-full max-w-md px-4 mb-6">
        <div className="flex items-center gap-2 w-full max-w-md bg-black border rounded-md shadow-sm px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
            fill="#6B7280"
            className="flex-shrink-0"
          >
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
          </svg>
          <input
            type="text"
            placeholder="Search by username or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none text-base text-white placeholder-gray-400"
          />
        </div>
      </div>

      <ul className="mb-10">
        {filteredUsers.map(({ user, bio, profilePics }) => (
          <li
            key={user.email}
            className="mb-4 relative rounded-[10px] bg-white/3 border border-white/10 backdrop-blur-[40px] shadow-[0_20px_40px_rgba(0,0,0,0.25)] items-center"
          >
            <Link href={`/client/view/${encodeURIComponent(user.email)}`}>
              <div className="flex lg:gap-40 gap-10  items-center text-white font-poppins px-4 cursor-pointer  rounded-md py-2">
                <div className="flex  items-center gap-3 justify-center">
                  {profilePics.length > 0 ? (
                    <Image
                      src={profilePics[0]?.url || "/default-avatar.png"}
                      alt={bio?.username || "User"}
                      width={56}
                      height={56}
                      className="w-14 h-14 aspect-square rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-xs text-gray-400">No image</span>
                  )}

                  <div className="text-sm w-10">
                    {bio?.username ?? "No username"}
                  </div>
                </div>
                <div className="text-xs text-gray-400 flex left-0 justify-start">
                  {bio?.job ?? "-"}
                </div>
                <div className="text-gray-500 text-xs ml-auto text-right">
                  {bio?.location?.split(",")[1]?.trim() ?? "No location"}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      
    </div>
  );
}