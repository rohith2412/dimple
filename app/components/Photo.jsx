"use client";

import { useState } from "react";
import imageCompression from "browser-image-compression";
import { useSession } from "next-auth/react";

export default function PhotoUploader() {
  const { data: session } = useSession();
  const userEmail = session?.user?.email || "";

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setError("");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select an image.");
      return;
    }
    if (!userEmail) {
      setError("User not authenticated.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 9.5,
        maxWidthOrHeight: 4096,
        useWebWorker: true,
      });

      if (compressedFile.size > 10 * 1024 * 1024) {
        setError("File still too large after compression.");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("file", compressedFile);
      formData.append("user", userEmail);

      const res = await fetch("/api/photo", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setError("");
      setFile(null);
      setFileName("");
      alert("Upload successful!");
    } catch (err) {
      setError(err.message || "Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center gap-2  items-center">
      {!session?.user ? (
        <p className="text-red-400 text-sm">Please log in first.</p>
      ) : (
        <div className="">
          <label
            htmlFor="file-upload"
            className="flex justify-center items-center w-30 gap-2 h-10 bg-white rounded-md"
          >
            <div className="flex scale-150">+</div>
            <div className="text-sm">Add Photo</div>    
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </label>

          {fileName && (
            <div>
              <p className="text-sm text-gray-400 mb-4 text-center break-all">
                Selected: {fileName}
              </p>
              <button
                onClick={handleUpload}
                className="bg-blue-500 w-24 py-2 rounded text-black text-sm hover:bg-blue-600 transition"
                disabled={loading}
              >
                {loading ? "Uploading..." : "Upload"}
              </button>
            </div>
          )}

          {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
        </div>
      )}
    </div>
  );
}
