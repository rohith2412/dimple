"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BioChecker() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showAddPicPrompt, setShowAddPicPrompt] = useState(false);

  useEffect(() => {
    const checkProfilePic = async () => {
      if (!session?.user?.email) return;

      try {
        const url = new URL("/api/getProfilePic", window.location.origin);
        url.searchParams.set("user", session.user.email);

        const res = await fetch(url.toString());

        if (res.status === 404) {
          setShowAddPicPrompt(true);
        }
      } catch (error) {
        console.error("Failed to check profile picture:", error);
      }
    };

    if (status === "authenticated") {
      checkProfilePic();
    }
  }, [session, status]);

  if (status === "loading") return null;

  return (
    showAddPicPrompt && (
      <div className="text-white scale-70 pt-10 flex">
        <div className=" ">
          <div className="">
            <div className="flex items-center justify-center gap-1">
              <div className="flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#fbbf24"
                className="w-6 h-6"
              >
                <path d="m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Zm40-100Z" />
              </svg>
            </div>

            <div className="">
              <h3 className="">
                Complete your profile to get featured
              </h3>
            </div>
            </div>

            <div className=" pt-3  w-fit  text-black rounded-md ">
              <button
                onClick={() => router.push("/client/bio")}
                className=" px-4 py-2 bg-white text-black text-sm  rounded-md"
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
