"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import LoadingSpinner from "./LoadingSpinner";
import { Mysettings } from "./Mysettings";
import ViewPhoto from "./ViewPhoto";
import  Photo  from "./Photo";

export default function MainProfileView() {
  const { data: session, status } = useSession();

  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const [bio, setBio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!session || status === "loading") return;

    const fetchProfilePic = async () => {
      try {
        const res = await fetch(
          `/api/getProfilePic?user=${encodeURIComponent(session.user.email)}`
        );
        if (!res.ok) throw new Error("Profile picture not found");
        const data = await res.json();
        setProfilePicUrl(data.url);
      } catch {
        setProfilePicUrl(null);
      }
    };

    const fetchBio = async () => {
      try {
        const res = await fetch(
          `/api/bio?user=${encodeURIComponent(session.user.email)}`
        );
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        setBio(data);
      } catch (err) {
        setError(err.message || "Could not load bio.");
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchProfilePic();
      fetchBio();
    } else if (status === "unauthenticated") {
      setError("Please log in first.");
      setLoading(false);
    }
  }, [session, status]);

  if (loading)
    return (
      <div className="text-white flex justify-center p-8">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="lg:scale-100 lg:pt-10 pt-10 grid justify-center items-center ">
     <div className="w-full max-w-md px-4">
        <div className="flex w-90 justify-evenly items-center Poppins rounded-3xl backdrop-blur-md backdrop-saturate-150 shadow-lg border border-white/10 relative">
          <div className="relative">
            <Image
              src={profilePicUrl || "/default_img.png"}
              alt="Profile photo"
              width={96}
              height={96}
              className="w-24 h-24 rounded-full object-cover border border-white shadow-sm"
              unoptimized
            />
            <div className="absolute inset-0 rounded-full border border-cyan-500 blur-sm opacity-30" />
          </div>

          <div className="p-6 grid justify-center">
            <div className="flex justify-center gap-8 w-max text-white items-center">
              <h1 className="">
                {bio?.username?.split(" ")[0] || (
                  <span className="text-gray-400">No name</span>
                )}
              </h1>
              <div className="text-xs text-gray-500 flex items-center gap-1">
                {bio?.location && (
                  <>
                    <span>📍</span>
                    <div className="grid grid-cols-1">
                      {bio.location.split(" ").map((word, idx) => (
                        <div key={idx}>{word}</div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="flex w-max justify-center text-gray-400 items-center gap-3 text-sm pt-5 ">
              {bio?.age && <div>{bio.age} yrs,</div>}
              {bio?.job && <div>{bio.job}</div>}
            </div>

            <p className="flex w-max justify-center text-gray-400 items-center gap-3 text-sm ">
              " {bio?.bio || "No bio yet."} "
            </p>
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      
      <ViewPhoto />

      <div className="grid gap-0 mb-20 items-center justify-center pt-5">
        <Photo />
        <Mysettings />
      </div>
    </div>
  );
}
