import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

const EditandLogoutButton = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="pt-6 flex justify-center gap-10">
      {/* Edit Profile Button */}
      <Link href="/client/bio" className="scale-80">
        <button
          onClick={() => setLoading(true)}
          disabled={loading}
          className="py-2 px-4 rounded border text-white transition disabled:opacity-60"
        >
          {loading ? "Loading..." : "Edit Profile"}
        </button>
      </Link>

      {/* Sign Out Button */}
      <div className="scale-80">
        <button
          onClick={() => signOut()}
          className="w-20 bg-red-400 py-2 rounded text-black"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default EditandLogoutButton;
