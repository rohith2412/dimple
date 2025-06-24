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

interface Photo {
  url: string;
  filename?: string;
}

interface UserData {
  user: {
    name?: string;
    email: string;
    image?: string;
  };
  bio: Bio | null;
  profilePics: ProfilePic[];
  photo?: Photo[];
}

export default function ProfileView() {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const params = useParams();
  const email = decodeURIComponent(params.email as string);

  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleImageClick = () => {
    setIsFullScreen(true);
  };

  const handleClose = () => {
    setIsFullScreen(false);
  };


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

  if (loading) return <div className="text-white flex justify-center p-30">Loading profile...</div>;
  if (error) return <div className="text-white flex justify-center p-30">Error: {error}</div>;
  if (!userData)
    return <div className="text-white flex justify-center p-30">No profile data found.</div>;

  return (
    <div className="">
      <div className="scale-80 ">
        <div className="flex justify-evenly items-center  rounded-3xl bg-gray-950/30 backdrop-blur-md backdrop-saturate-150 shadow-lg border border-white/10">
          <div>
            {userData.profilePics.length > 0 ? (
              <img
                src={userData.profilePics[0].url}
                alt="Profile Picture"
                className="w-24 h-24 rounded-full object-cover border border-white shadow-sm"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
            <div className="absolute inset-0 rounded-full border border-cyan-500 blur-sm opacity-30" />
          </div>



          <div className="p-6 grid justify-center ">
          <div className="flex justify-center gap-8 w-max text-gray-300 items-center ">
            <div>
              <h1 className="">{userData.bio?.username ?? "No username"}</h1>
            </div>
            <div className="text-xs text-gray-500 items-center">
              <span>📍</span>{userData.bio?.location ?? "No location"}
            </div>
          </div>
          <div className="flex w-max justify-center text-gray-400  items-center gap-3 text-sm pt-5">
            <div>{userData.bio?.age ?? "No location"}<span> yrs,</span></div>
            {userData.bio?.job ?? "No location"}
          </div>
          <div>
            <p className="text-gray-400 flex justify-start text-sm text-center mt-1 max-w-xs">
              - {userData.bio?.bio ?? "No location"}
            </p>
          </div>
        </div>
      </div>

      <>
      <div className="flex flex-col items-center pt-10">
        {userData.photo && userData.photo.length > 0 ? (
          <img
            src={userData.photo[0].url}
            alt="Photo"
            onClick={handleImageClick}
            className="w-70 rounded cursor-pointer transition-transform hover:scale-105"
          />
        ) : (
          <div className="w-20 h-20 flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      {isFullScreen && (
  <div
    onClick={handleClose}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
  >
    <img
      src={userData.photo[0].url}
      alt="Full Screen"
      className="max-w-screen max-h-screen object-contain"
    />
   
  </div>
)}

    </>
 


      {/* <div className="flex flex-col items-center">
      {profilePicUrl ? (
        <Image
          src={profilePicUrl}
          alt="Profile photo"
          width={96}
          height={96}
          className="w-70"
          unoptimized
        />
      ) : (
        <span className="text-gray-700 text-sm p-20">No photo yet</span>
      )}
    </div> */}
      </div>
    </div>
  );
}
