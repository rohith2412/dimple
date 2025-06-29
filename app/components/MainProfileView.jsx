"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

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
        const res = await fetch(`/api/getProfilePic?user=${encodeURIComponent(session.user.email)}`);
        if (!res.ok) throw new Error("Profile picture not found");
        const data = await res.json();
        setProfilePicUrl(data.url);
      } catch {
        setProfilePicUrl(null);
      }
    };

    const fetchBio = async () => {
      try {
        const res = await fetch(`/api/bio?user=${encodeURIComponent(session.user.email)}`);
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
      <div className="text-black flex justify-center p-30">Loading users...</div>
    );

  return (
    <div className="scale-80 lg:scale-90 mx-auto lg:w-fit lg:grid lg:justify-center lg:items-center">
      <div className="flex text-black justify-evenly items-center rounded-3xl backdrop-blur-md backdrop-saturate-150 shadow-lg border border-white/10">
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
          <div className="flex justify-center gap-8 w-max text-gray-300 items-center">
            <h1 className="text-black text-xl">
              {bio?.username?.split(" ")[0] || <span className="text-gray-400">No name</span>}
            </h1>
            <div className="text-xs text-gray-500 items-center">
              {bio?.location && <div>📍{bio.location}</div>}
            </div>
          </div>

          <div className="flex w-max justify-center text-gray-400 items-center gap-3 text-sm pt-5">
            {bio?.age && <div>{bio.age} yrs,</div>}
            {bio?.job && <div>{bio.job}</div>}
          </div>

          <p className="text-gray-400 flex justify-start text-sm text-center mt-1 max-w-xs">
            - {bio?.bio || "No bio yet."}
          </p>
        </div>
      </div>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      <div className="flex justify-center gap-15 text-gray-400 pt-10">
        <div className="border bg-gray-900 w-30 text-center p-1 text-sm rounded-md">
          My photo
        </div>
        <Link href="/client/profile">
          <div className="border w-30 text-center p-1 text-sm rounded-md cursor-pointer">
            Settings
          </div>
        </Link>
      </div>
    </div>
  );
}
