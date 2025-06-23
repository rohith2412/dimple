"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function MainProfileView() {
  const { data: session, status } = useSession();

  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null);
  const [bio, setBio] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    const fetchProfilePic = async () => {
      if (!session?.user?.email) return;
      try {
        const res = await fetch(
          `/api/getProfilePic?user=${session.user.email}`
        );
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setProfilePicUrl(data.url);
      } catch {
        setProfilePicUrl(null);
      }
    };

    const fetchBio = async () => {
      if (!session?.user?.email) {
        setError("User not authenticated or missing email");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/bio?user=${session.user.email}`);
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        setBio(data);
      } catch (err: any) {
        setError(err.message || "Failed to load bio");
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

  const handleClick = () => setButtonLoading(true);

  return (
    <div className=" scale-80 ">
      <div className="flex justify-evenly items-center w-[95%] rounded-3xl bg-gray-950/30 backdrop-blur-md backdrop-saturate-150 shadow-lg border border-white/10">
        <div className="">
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

        <div className="p-6 grid justify-center ">
          <div className="flex justify-center gap-8 w-max text-gray-300 items-center ">
            <div>
              <h1 className="">{bio?.username.split(' ')[0]}</h1>
            </div>
            <div className="text-xs text-gray-500 items-center">
              {bio?.location && <div>📍{bio.location}</div>}
            </div>
          </div>
          <div className="flex w-max justify-center text-gray-400  items-center gap-3 text-sm pt-5">
            <div>{bio?.age && <div>{bio.age} yrs, </div>}</div>
            <div>{bio?.job && <div>{bio.job}</div>}</div>
          </div>
          <div>
            <p className="text-gray-400 flex justify-start text-sm text-center mt-1 max-w-xs">
              - {bio?.bio || "No bio yet."}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-15 text-gray-400 pt-10">
        <div className="border bg-gray-900 w-30 text-center  p-1 text-sm rounded-md">My pohoto</div>
        <Link href={"/client/profile"}>
            <div className="border w-30 text-center  p-1 text-sm rounded-md">setting</div>
        </Link>
      </div>

      {/* Buttons */}
      {/* <div className="mt-8 w-full max-w-xs space-y-3">
        <Link href="/client/bio">
          <button
            onClick={handleClick}
            disabled={buttonLoading}
            className="w-full py-2 rounded bg-white text-black transition disabled:opacity-60"
          >
            {buttonLoading ? 'Loading...' : 'Edit Profile'}
          </button>
        </Link>
        <button
          onClick={() => signOut()}
          className="w-full py-2 rounded bg-red-500 text-white"
        >
          Sign Out
        </button>
      </div> */}
    </div>
  );
}
