"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

export default function BioForm() {
  const { data: session } = useSession();

  const [form, setForm] = useState({
    job: "",
    age: "",
    location: "",
    phone: "",
    username: "",
    bio: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      const res = await fetch("/api/bio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: session?.user?.id,
          ...form,
          age: Number(form.age),
          phone: Number(form.phone),
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to submit");

      setSuccess("Bio created successfully!");
      setForm({
        job: "",
        age: "",
        location: "",
        phone: "",
        username: "",
        bio: "",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!session?.user?.id) {
    return <p className="text-white">Please log in to submit your bio.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="text-white space-y-4 p-4 max-w-md mx-auto">
      <input name="job" value={form.job} onChange={handleChange} placeholder="Job" className="w-full p-2 rounded bg-gray-800" />
      <input name="age" type="number" value={form.age} onChange={handleChange} placeholder="Age" className="w-full p-2 rounded bg-gray-800" />
      <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="w-full p-2 rounded bg-gray-800" />
      <input name="phone" type="number" value={form.phone} onChange={handleChange} placeholder="Phone" className="w-full p-2 rounded bg-gray-800" />
      <input name="username" value={form.username} onChange={handleChange} placeholder="Username" className="w-full p-2 rounded bg-gray-800" />
      <textarea name="bio" value={form.bio} onChange={handleChange} placeholder="Short bio..." className="w-full p-2 rounded bg-gray-800" />

      <button type="submit" disabled={loading} className="bg-blue-600 px-4 py-2 rounded">
        {loading ? "Submitting..." : "Submit Bio"}
      </button>

      {success && <p className="text-green-400 mt-2">{success}</p>}
    </form>
  );
}
