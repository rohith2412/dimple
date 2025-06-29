"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function EditProfilePicture() {
  const { data: session } = useSession();
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : "");
  };

  const handleUpload = async () => {
    if (!file || !session?.user?.email) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("user", session.user.email);

    setLoading(true);
    try {
      const res = await fetch("/api/profilePicture", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");

      router.push("/client/profile");
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-auto lg:flex lg:justify-center lg:gap-55 mx-auto p-6 flex justify-evenly gap-50 items-center text-gray-900">
      <div>
        <h1 className="text-sm Poppins flex pl-5 justify-start fixed">
          Profile Picture
        </h1>
      </div>

      <div className="flex justify-end items-end">
        {!session?.user ? (
          <p className="text-red-500 text-sm">Please log in first.</p>
        ) : (
          <div className="flex justify-end items-center gap-3">
            <div>
              <label
                htmlFor="file-upload"
                className="cursor-pointer bg-gray-100 border border-gray-300 rounded-full p-4 flex items-center justify-center w-7 h-7 hover:bg-gray-200 transition"
                title="Choose file"
              >
                <span className="text-3xl select-none text-gray-500">+</span>
                <input
                  id="file-upload"
                  type="file"
                  onChange={handleChange}
                  className="hidden"
                  accept="image/*"
                />
              </label>

              {fileName && (
                <p className="mt-3 text-center text-gray-500 text-xs truncate w-full px-2">
                  {fileName}
                </p>
              )}
            </div>

            <div>
              <button
                onClick={handleUpload}
                disabled={!file || loading}
                className="bg-blue-600 w-full p-2 rounded-lg text-white font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
