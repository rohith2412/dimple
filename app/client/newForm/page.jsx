"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Background from "@/app/components/Background";

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const checkUsername = async () => {
      if (!session?.user?.email) return;

      try {
        const res = await fetch(`/api/bio?user=${session.user.email}`);
        if (res.ok) {
          const data = await res.json();
          if (data?.username) {
            router.replace("/client/dashboard");
          }
        }
      } catch (err) {
        console.error("Failed to check username:", err);
      }
    };

    if (status === "authenticated") checkUsername();
  }, [session, status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      const res = await fetch("/api/bio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: session?.user?.email,
          username,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit");

      setSuccess("Profile updated successfully!");
      router.push("/client/dashboard");
      setUsername("");
    } catch {
      setSuccess("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Background />
      <form
        onSubmit={handleSubmit}
        className="flex pb-70  justify-center gap-3 items-center  h-screen  Poppins"
      >
        <input
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          className="w-70 px-4 text-gray-400 py-2 bg-transparent border-b border-gray-700 mb-4 focus:outline-none"
        />

        <div className="flex w-10 justify-center items-center">
          <button
            type="submit"
            disabled={loading}
            className="w-8 h-8 bg-white text-black rounded-md hover:bg-gray-200 transition flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="16"
              viewBox="0 -960 960 960"
              fill="currentColor"
            >
              <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
            </svg>
          </button>
        </div>

        {success && (
          <p className="text-green-400 mt-4 text-sm text-center">{success}</p>
        )}
      </form>
    </div>
  );
};

export default Page;
