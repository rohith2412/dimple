'use client';

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const BioView = () => {
  const { data: session, status } = useSession();
  const [bio, setBio] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

    if (status === "authenticated") fetchBio();
    else if (status === "unauthenticated") {
      setError("Please log in first.");
      setLoading(false);
    }
  }, [session, status]);

  const [buttonLoading, setButtonLoading] = useState(false);
  const handleClick = () => {
    setButtonLoading(true);
  };

  return (
    <div className="text-white pt-10">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {bio && (
        <div className="grid justify-evenly gap-3">
          <div>
            <span className="pr-3">Username</span>
            <span>{bio.username || <span className="text-gray-600">Add username</span>}</span>
          </div><hr />
          <div>
            <span className="pr-15">Job</span>
            <span>{bio.job || <span className="text-gray-600">Add job</span>}</span>
          </div><hr />
          <div>
            <span className="pr-7">Location</span>
            <span>{bio.location || <span className="text-gray-600">Add location</span>}</span>
          </div><hr />
          <div>
            <span className="pr-16">Age</span>
            <span>{bio.age || <span className="text-gray-600">Add Age</span>}</span>
          </div><hr />
          <div>
          <span className="pr-18">bio</span>
          <span>
            {bio.bio
              ? `${bio.bio.split(' ').slice(0, 2).join(' ')}...`
              : <span className="text-gray-600">Add bio</span>}
          </span>
          </div><hr />
          <div>
            <span className="pr-10">gender</span>
            <span>{bio.gender || <span className="text-gray-600">Add gender</span>}</span>
          </div><hr />

          <div className="flex justify-center pt-10">
            <Link href={"/client/bio"}>
              <button
                onClick={handleClick}
                disabled={buttonLoading}
                className="bg-white text-black rounded p-[6px] text-xs"
              >
                {buttonLoading ? "Loading..." : "Edit profile"}
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default BioView;
