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
      <div className="text-black flex justify-center p-30">Error: {error}</div>
    );

  if (!userData)
    return (
      <div className="text-black flex justify-center p-30">
        No profile data found.
      </div>
    );

  return (
    <div className="lg:scale-120 lg:pt-10 mx-auto lg:w-fit lg:grid lg:justify-center lg:items-center">
      <div className="scale-80">
        <div className="flex w-90 justify-evenly items-center Poppins rounded-3xl backdrop-blur-md backdrop-saturate-150 shadow-lg border border-white/10 relative">
          <div className="flex justify-center items-center">
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

          <div className="p-6 grid justify-center">
            <div className="flex justify-center gap-8 w-max text-white items-center">
              <div>
                <h1>{userData.bio?.username ?? "No username"}</h1>
              </div>
              <div className="text-xs text-gray-500 flex items-center gap-1">
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

            <div className="flex w-max justify-center text-gray-400 items-center gap-3 text-sm pt-5">
              <div>
                {userData.bio?.age ?? "N/A"}
                <span> yrs,</span>
              </div>
              {userData.bio?.job ?? "No job info"}
            </div>

            <div>
              <p className="text-gray-400 flex justify-start text-sm text-center mt-1 max-w-xs">
                " {userData.bio?.bio ?? "No bio info"} "
              </p>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="flex flex-col items-center justify-center pt-10">
          {userData.photo && userData.photo.length > 0 ? (
            <div
              onClick={handleImageClick}
              className="cursor-pointer transition-transform hover:scale-105"
            >
              <Image
                src={userData.photo[0].url}
                alt="Photo"
                width={280}
                height={180}
                className="rounded"
                unoptimized
              />
            </div>
          ) : (
            <div className="w-20 h-20 flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>

        {/* Fullscreen Modal */}
        {isFullScreen && userData.photo?.[0] && (
          <div
            onClick={handleClose}
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm cursor-zoom-out"
          >
            <Image
              src={userData.photo[0].url}
              alt="Full Screen"
              width={800}
              height={600}
              className="object-contain max-w-full max-h-full"
              unoptimized
            />
          </div>
        )}
      </div>
    </div>
  );
}
