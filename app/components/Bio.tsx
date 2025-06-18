
'use client';

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Bio = () => {
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

  return (
    <div className="text-white">
      {loading && <p>Loading bio...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {bio && (
        <div>
          <div>Username: {bio.username}</div>
          <div>Job: {bio.job}</div>
          <div>Location: {bio.location}</div>
          <div>Phone: {bio.phone}</div>
          <div>Age: {bio.age}</div>
        </div>
      )}
    </div>
  );
};

export default Bio;
