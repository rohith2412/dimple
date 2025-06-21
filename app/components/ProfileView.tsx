"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface ProfilePic {
  url: string;
  filename?: string;
}

interface Bio {
  username?: string;
  location?: string;
}

interface UserData {
  user: {
    name?: string;
    email: string;
    image?: string;
  };
  bio: Bio | null;
  profilePics: ProfilePic[];
}

export default function ProfileView() {
  const params = useParams();
  const email = decodeURIComponent(params.email as string);

  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/user?email=${encodeURIComponent(email)}`);
        if (!res.ok) throw new Error("Failed to fetch user data");

        const data: UserData[] = await res.json();

        const foundUser = data.find((item) => item.user.email === email);

        if (!foundUser) {
          setError("User not found");
          setUserData(null);
        } else {
          setUserData(foundUser);
        }
      } catch (err: any) {
        setError(err.message || "An error occurred");
        setUserData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [email]);

  if (loading) return <div className="text-white p-4">Loading profile...</div>;
  if (error) return <div className="text-white p-4">Error: {error}</div>;
  if (!userData)
    return <div className="text-white p-4">No profile data found.</div>;

  return (
    <div className="text-white p-4 max-w-md mx-auto">
      <div className="flex items-center gap-4 mb-4">
        {userData.profilePics.length > 0 ? (
          <img
            src={userData.profilePics[0].url}
            alt="Profile Picture"
            className="w-20 h-20 rounded-full object-cover"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}

        <div>
          <div className="text-xl font-semibold">
            {userData.bio?.username ?? "No username"}
          </div>
          <div className="text-sm text-gray-400">
            {userData.bio?.location ?? "No location"}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">User Info</h2>
        <p>Name: {userData.user.name ?? "No name"}</p>
      </div>
    </div>
  );
}
