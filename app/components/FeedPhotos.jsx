"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

export default function FeedPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const res = await fetch("/api/feed");
        if (!res.ok) throw new Error("Failed to fetch photos");
        const data = await res.json();
        setPhotos(data);
      } catch (err) {
        setError(err.message || "Could not load photos.");
      } finally {
        setLoading(false);
      }
    }
    fetchPhotos();
  }, []);

  if (loading) return <div className="text-white flex justify-center p-8"><LoadingSpinner /></div>;
  if (error) return <div className="text-center mt-10 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <div className="grid  grid-cols-1 sm:grid-cols-2 gap-6">
        {photos.map(({ photo, username }) => (
          <Link
            key={photo._id}
            href={`/client/view/${encodeURIComponent(photo.user || "")}`}
            className="block group rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative">
              <Image
                src={photo.url}
                alt={photo.filename || "Photo"}
                width={400}
                height={300}
                className="w-full h-auto object-cover rounded-t-lg"
                unoptimized
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
