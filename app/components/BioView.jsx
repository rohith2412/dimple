'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import EditandLogoutButton from "./Edit&LogoutButton";
import LoadingSpinner from "./LoadingSpinner";

export default function BioView() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [bio, setBio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBio = async () => {
      if (!session?.user?.email) {
        setError("User not logged in.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/bio?user=${session.user.email}`);
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        setBio(data);
      } catch (err) {
        setError(err?.message || "Could not load bio.");
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchBio();
    } else if (status === "unauthenticated") {
      setError("Please log in.");
      setLoading(false);
    }
  }, [session, status]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  return (
    <div className="p-6 text-white text-sm pb-10">
      {loading &&   <div className="text-white flex justify-center p-8"><LoadingSpinner /></div>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {bio && (
        <div className="flex justify-center gap-5 items-center">
          <div className="grid gap-4">
            <span className="font-medium text-gray-400 text-right pr-2">Username</span>
            <span className="font-medium text-gray-400 text-right pr-2">Job</span>
            <span className="font-medium text-gray-400 text-right pr-2">Location</span>
            <span className="font-medium text-gray-400 text-right pr-2">Age</span>
            <span className="font-medium text-gray-400 text-right pr-2">Gender</span>
            <span className="font-medium text-gray-400 text-right pr-2">Bio</span>
          </div>

          <div className="grid gap-3">
            <span className="border-b pb-1 border-gray-700 flex text-left">
              {bio.username || <span className="text-gray-200">Add username</span>}
            </span>
            <span className="border-b pb-1 border-gray-700 flex justify-start">
              {bio.job || <span className="text-gray-200">Add job</span>}
            </span>
            <span className="border-b pb-1 border-gray-700 flex justify-start">
              {bio.location || <span className="text-gray-200">Add location</span>}
            </span>
            <span className="border-b pb-1 border-gray-700 flex justify-start">
              {bio.age ?? <span className="text-gray-200">Add age</span>}
            </span>
            <span className="border-b pb-1 border-gray-700 flex justify-start">
              {bio.gender || <span className="text-gray-200">Add gender</span>}
            </span>
            <span className="border-b pb-1 border-gray-700 flex justify-start">
              {bio.bio ? `${bio.bio.split(" ").slice(0, 2).join(" ")}...` : <span className="text-gray-200">Add bio</span>}
            </span>
          </div>
        </div>
      )}

      <div className="pt-5">
        <EditandLogoutButton />
      </div>
    </div>
  );
}
