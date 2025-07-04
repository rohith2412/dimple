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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#434343"
            >
              <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
            </svg> 
            <div className="text-sm">Edit Photo</div>    
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
