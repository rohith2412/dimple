"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const LoginButton = () => {
  const { status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/client/newForm");
    }
  }, [status, router]);

  useEffect(() => {
    const esc = (e) => {
      if (e.key === "Escape") setShow(false);
    };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  const handleJoinClick = () => {
    setLoading(true);
    setTimeout(() => {
      setShow(true);
      setLoading(false);
    }, 300);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      {/* Join Button */}
      <div className="flex justify-center pt-5 z-10">
        <button
          onClick={handleJoinClick}
          disabled={loading}
          className={`relative overflow-hidden px-7 py-2 text-lg Poppins rounded-xl bg-gradient-to-r from-emerald-400 to-lime-500 text-black border border-black shadow-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
            loading ? "cursor-not-allowed opacity-60" : ""
          }`}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-black animate-ping" />
              Joining...
            </span>
          ) : (
            "Join"
          )}
        </button>
      </div>

      {show && (
        <div
          onClick={handleClose}
          className="fixed inset-0 z-50 pb-14 flex items-center justify-center bg-black/50 backdrop-blur-[18px] transition-opacity duration-300"
          role="dialog"
          aria-modal="true"
        >

          
          
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-[70%] max-w-md rounded-[30px] bg-white/20 border border-white/30 backdrop-blur-[40px] shadow-[0_20px_40px_rgba(0,0,0,0.25)] px-10 py-12 flex flex-col items-center"
            style={{
              boxShadow:
                "0 20px 40px rgba(0,0,0,0.25), inset 0 0 40px rgba(255, 255, 255, 0.3)",
            }}
          >
            {/* Liquid glass glow ring */}

           <div
              aria-hidden="true"
              
              className="absolute grid justify-center items-center inset-0 rounded-[10px] pointer-events-none"
              style={{
                boxShadow:
                  "0 0 40px 6px rgba(255, 255, 255, 0.25), inset 0 0 20px 4px rgba(255, 255, 255, 0.3)",
                filter: "blur(60px)",
              }}
            />

            <h2 className="relative text-xl Poppins tracking-tighter  text-gray-300 drop-shadow-md  mb-8 select-none">
              Sign in to Continue
            </h2>

            <button
              onClick={() => signIn("google")}
              className="text-sm relative z-10 w-full max-w-xs flex items-center justify-center gap-4 px-6 py-3 bg-white/85 rounded-3xl shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-250  text-gray-900 backdrop-filter backdrop-blur-sm"
            >
              <Image
                src="/google.webp"
                alt="Google logo"
                width={24}
                height={24}
                className="rounded-full"
              />
              Continue with Google
            </button>

            <div className="flex justify-center gap-1 text-[14px] items-center text-gray-300 pt-2">
              <span>made with</span>
              <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#F3F3F3"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/></svg>
              <span>by</span>
              <span className="underline">dimple.</span>
            </div>

            <p
              onClick={handleClose}
              className="relative z-10 mt-8 text-sm text-gray-300 hover:text-white cursor-pointer select-none transition-colors"
            >
             Back
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginButton;
