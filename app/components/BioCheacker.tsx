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
      <div className="pt-10">
        <div className=" text-white w-full max-w-md mx-auto bg-gradient-to-r  rounded-lg shadow-lg p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
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

            <div className="flex-1 min-w-0">
              <h3 className=" font-medium text-sm sm:text-base mb-1">
                Complete your profile to get featured
              </h3>
            </div>

            <div className="w-full sm:w-auto mt-3 bg-white text-black rounded-md sm:mt-0 sm:ml-3">
              <button
                onClick={() => router.push("/client/bio")}
                className="w-full sm:w-auto px-4 py-2 text-black text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2  focus:ring-offset-2 "
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
