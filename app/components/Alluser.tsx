"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface ProfilePic {
  url: string;
  filename?: string;
}

interface Bio {
  username?: string;
  location?: string;
}

interface User {
  name: string;
  email: string;
  image?: string;
}

interface UserData {
  user: User;
  bio: Bio | null;
  profilePics: ProfilePic[];
}

const Alluser: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/user")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((data: UserData[]) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-white">Loading users...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div>
      <ul>
        {users.map(({ user, bio, profilePics }, idx) => (
          <li key={idx} className="mb-4">
            <Link href={`/client/view/${encodeURIComponent(user.email)}`}>
              <div className="flex justify-between items-center text-white Poppins px-4">
                {/* Left: Image + Username */}
                <div className="flex items-center gap-3 pl-15">
                  {profilePics.length > 0 ? (
                    <img
                      src={profilePics[0].url}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-xs text-gray-400">No image</span>
                  )}
                  <div className="text-sm">
                    {bio?.username ?? "No username"}
                  </div>
                </div>
                <div className="text-xs text-gray-500 pr-10 flex items-center gap-1">
                  {bio?.location?.split(",")[1]?.trim() ?? "No location"}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
    
  );
};

export default Alluser;
