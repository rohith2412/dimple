"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import EditandLogoutButton from "./Edit&LogoutButton";

const BioView = () => {
  const { data: session, status } = useSession();
  const [bio, setBio] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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
  

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/client/auth");
    }
  }, [status, router]);

  const [buttonLoading, setButtonLoading] = useState(false);
  const handleClick = () => setButtonLoading(true);

  return (
    <div className="p-6 text-black text-sm pb-10 ">
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-400">{error}</p>}
      {bio && (
        <div className="space-y-4">
          {[
            { label: "Username", value: bio.username },
            { label: "Job", value: bio.job },
            { label: "Location", value: bio.location },
            { label: "Age", value: bio.age },
            {
              label: "Bio",
              value: bio.bio
                ? `${bio.bio.split(" ").slice(0, 2).join(" ")}...`
                : null,
            },
            { label: "Gender", value: bio.gender },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex justify-between border-b border-gray-700 pb-1"
            >
              <span className="text-gray-400">{label}</span>
              <span>
                {value || (
                  <span className="text-gray-600">
                    Add {label.toLowerCase()}
                  </span>
                )}
              </span>
            </div>
          ))}

          
        </div>
        
      )}
      <EditandLogoutButton/>
    </div>
  );
};

export default BioView;
