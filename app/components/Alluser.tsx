"use client"
import React, { useEffect, useState } from "react";

interface ProfilePic {
  url: string;
  filename?: string;
}

interface Bio {
  username?: string;
}

interface UserData {
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

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      
      <ul>
        {users.map(({ bio, profilePics }, idx) => (
          <li key={idx} style={{ marginBottom: "1rem" }}>
            <div className="flex justify-center text-white items-center gap-3 Poppins">
            <div style={{ display: "flex", gap: 10, marginTop: 5 }}>
              {profilePics.length > 0 ? (
                profilePics.map(({ url }, i) => (
                  <img
                    key={i}
                    src={url}
                    alt={`profile pic ${i + 1}`}
                    style={{
                      width: 40,
                      height: 40,
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                ))
              ) : (
                <span>No images</span>
              )}
            </div>
            <div>
              {bio?.username ?? "No username"} <br />
            </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Alluser;
