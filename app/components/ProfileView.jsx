"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

export default function ProfileView() {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const params = useParams();
  const email = decodeURIComponent(params.email);

  const handleImageClick = () => setIsFullScreen(true);
  const handleClose = () => setIsFullScreen(false);

  useEffect(() => {
    async function fetchUserData() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/user?email=${encodeURIComponent(email)}`);
        if (!res.ok) throw new Error("Failed to fetch user data");

        const data = await res.json();
        const foundUser = data.find((item) => item.user.email === email);

        if (!foundUser) {
          setError("User not found");
          setUserData(null);
        } else {
          setUserData(foundUser);
        }
      } catch (err) {
        setError(err.message || "An error occurred");
        setUserData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [email]);

  if (loading)
    return (
      <div className="">
        <LoadingSpinner />
      </div>
    );

  if (error)
    return (
      <div className="text-black flex justify-center p-10">Error: {error}</div>
    );

  if (!userData)
    return (
      <div className="text-black flex justify-center p-10">
        No profile data found.
      </div>
    );

  return (
    <div className="pt-10 px-4 flex justify-center items-center">
      <div className="w-full max-w-md flex flex-col items-center gap-10">
     
        <div className="lg:w-100 w-90 flex justify-evenly items-center Poppins rounded-3xl backdrop-blur-md backdrop-saturate-150 shadow-lg border border-white/10 relative px-4 py-6">
          <div className="relative justify-start mr-6">
            {userData.profilePics.length > 0 ? (
              <Image
                src={userData.profilePics[0].url}
                alt="Profile Picture"
                width={96}
                height={96}
                className="w-24 h-24 rounded-full object-cover border border-white shadow-sm"
                unoptimized
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center text-black">
                No Image
              </div>
            )}
            <div className="absolute inset-0 rounded-full border border-cyan-500 blur-sm opacity-30" />
          </div>

          {/* Text Info */}
          <div className="flex flex-col justify-center text-white">
            <div className="flex justify-between sm:flex-row items-center gap-3 mb-1">
              <h1 className="text-base font-semibold">
                {userData.bio?.username ?? "No username"}
              </h1>
               <div className="text-xs flex justify-end text-gray-500  items-center gap-1">
                <span>📍</span>
                {userData.bio?.location ? (
                  <div className="grid grid-cols-1">
                    {userData.bio.location.split(" ").map((word, idx) => (
                      <div key={idx}>{word}</div>
                    ))}
                  </div>
                ) : (
                  <div>No location</div>
                )}
              </div>
        
            </div>

            <div className="flex gap-2 text-sm text-gray-400 mb-1">
              <span>{userData.bio?.age ?? "N/A"} yrs,</span>
              <span>{userData.bio?.job ?? "No job info"}</span>
            </div>

            <p className="text-sm text-gray-400 max-w-xs">
              " {userData.bio?.bio ?? "No bio info"} "
            </p>
          </div>
        </div>

        {/* Gallery */}
        <div className="flex w-full pb-15  flex-col items-center justify-center pt-7">
          {userData.photo && userData.photo.length > 0 ? (
            <div
              onClick={handleImageClick}
              className="cursor-pointer transition-transform "
            >
              <Image
                src={userData.photo[0].url}
                alt="Photo"
                width={280}
                height={180}
                unoptimized
                className="w-full rounded "
              />
            </div>
          ) : (
            <div className="w-20 h-20 flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 