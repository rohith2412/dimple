"use client";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const LoginButton = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  // Redirect after login
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/client/newForm");
    }
  }, [status, router]);

  const handleJoinClick = () => {
    setLoading(true);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setLoading(false);
  };

  return (
    <>
      {/* Join Button */}
      <div className="flex justify-center pt-5 z-10">
        <button
          onClick={handleJoinClick}
          disabled={loading}
          className="px-10 py-2 bg-gradient-to-r from-green-400 to-lime-500 text-black border border-black rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 font-medium"
        >
          {loading ? "Loading..." : "Join"}
        </button>
      </div>

      {/* Blur + Google Login Modal */}
      {show && (
        <div
          className="fixed inset-0 z-50 pb-15  scale-135  bg-black/40 backdrop-blur-sm flex items-center justify-center transition-all"
          onClick={handleClose}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 w-70  max-w-sm shadow-2xl border border-white/20 transition-all"
          >
            <h2 className="text-4xl  alumni-sans  text-gray-800 text-center mb-4">
              Sign in 
            </h2>
           <div className="flex justify-center">
           <button
              onClick={() => signIn("google")}
              className=" flex items-center justify-center gap-3 px-4 py-2 bg-white text-black border border-gray-300 rounded-lg shadow hover:shadow-md hover:scale-105 transition"
            >
              <Image src="/google.webp" alt="Google" width={20} height={20} />
              <span className="text-sm">Continue with Google</span>
            </button>
           </div>
            <p
              onClick={handleClose}
              className="text-xs text-center text-gray-500 mt-4 cursor-pointer hover:underline"
            >
              Cancel
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginButton;
