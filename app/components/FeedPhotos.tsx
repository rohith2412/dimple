"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Photo {
  _id: string;
  url: string;
  filename?: string;
  user?: string;
}

interface PhotoWithUsername {
  photo: Photo;
  username: string;
}

export default function FeedPhotos() {
  const [photos, setPhotos] = useState<PhotoWithUsername[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const res = await fetch("/api/feed");
        if (!res.ok) throw new Error("Failed to fetch photos");
        const data: PhotoWithUsername[] = await res.json();
        setPhotos(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPhotos();
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {photos.map(({ photo, username }) => (
          <Link
            key={photo._id}
            href={`/client/view/${encodeURIComponent(photo.user || "")}`}
            className="block group rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative">
              <img
                src={photo.url}
                alt={photo.filename || "Photo"}
                className="w-fit object-cover rounded-t-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-white text-sm font-semibold">
                {username}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
