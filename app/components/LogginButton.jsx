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
      <div className="relative inline-block w-full py-3 modgp ">
        <div className="relative">
          <button
            type="button"
            onClick={handleJoinClick}
            className="inline-flex items-center justify-center bg-gray-300 text-sm text-gray-900 font-medium rounded-lg enabled:hover:bg-gray-50 enabled:hover:shadow-md enabled:active:bg-gray-100 enabled:focus:bg-gray-50 focus:outline-none border border-gray-200 w-full py-2.5 relative disabled:opacity-50 transition-all"
          >
            <div className="w-full font-semibold flex items-center justify-center">
              Join for free
            </div>
          </button>
        </div>
        <div className="absolute inset-0 pointer-events-none">
          <div
            id="style-AQliM"
            className="pointer-events-none absolute z-10 animate-magic-sparkle style-AQliM"
          >
            <svg
              style={{ filter: "drop-shadow(rgb(96, 165, 250) 0px 0px 2px)" }}
              fill="none"
              viewBox="0 0 68 68"
              height="6"
              width="6"
              className="animate-spin-slow"
            >
              <path
                fill="white"
                d="M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z"
              ></path>
            </svg>
          </div>
          <div
            id="style-WCb99"
            className="pointer-events-none absolute z-10 animate-magic-sparkle style-WCb99"
          >
            <svg
              style={{ filter: "drop-shadow(rgb(96, 165, 250) 0px 0px 2px)" }}
              fill="none"
              viewBox="0 0 68 68"
              height="9"
              width="9"
              className="animate-spin-slow"
            >
              <path
                fill="white"
                d="M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z"
              ></path>
            </svg>
          </div>
          <div
            id="style-dBNZV"
            className="pointer-events-none absolute z-10 animate-magic-sparkle style-dBNZV"
          >
            <svg
              style={{ filter: "drop-shadow(rgb(96, 165, 250) 0px 0px 2px)" }}
              fill="none"
              viewBox="0 0 68 68"
              height="7"
              width="7"
              className="animate-spin-slow"
            >
              <path
                fill="white"
                d="M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z"
              ></path>
            </svg>
          </div>
          <div
            id="style-tiisO"
            className="pointer-events-none absolute z-10 animate-magic-sparkle style-tiisO"
          >
            <svg
              style={{ filter: "drop-shadow(rgb(96, 165, 250) 0px 0px 2px)" }}
              fill="none"
              viewBox="0 0 68 68"
              height="6"
              width="6"
              className="animate-spin-slow"
            >
              <path
                fill="white"
                d="M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z"
              ></path>
            </svg>
          </div>
          <div
            id="style-re9B7"
            className="pointer-events-none absolute z-10 animate-magic-sparkle style-re9B7"
          >
            <svg
              style={{ filter: "drop-shadow(rgb(96, 165, 250) 0px 0px 2px)" }}
              fill="none"
              viewBox="0 0 68 68"
              height="9"
              width="9"
              className="animate-spin-slow"
            >
              <path
                fill="white"
                d="M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z"
              ></path>
            </svg>
          </div>
          <div
            id="style-BKG4G"
            className="pointer-events-none absolute z-10 animate-magic-sparkle style-BKG4G"
          >
            <svg
              style={{ filter: "drop-shadow(rgb(96, 165, 250) 0px 0px 2px)" }}
              fill="none"
              viewBox="0 0 68 68"
              height="5"
              width="5"
              className="animate-spin-slow"
            >
              <path
                fill="white"
                d="M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z"
              ></path>
            </svg>
          </div>
          <div
            id="style-NaoVe"
            className="pointer-events-none absolute z-10 animate-magic-sparkle style-NaoVe"
          >
            <svg
              style={{ filter: "drop-shadow(rgb(96, 165, 250) 0px 0px 2px)" }}
              fill="none"
              viewBox="0 0 68 68"
              height="6"
              width="6"
              className="animate-spin-slow"
            >
              <path
                fill="white"
                d="M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z"
              ></path>
            </svg>
          </div>
          <div
            id="style-pwIlv"
            className="pointer-events-none absolute z-10 animate-magic-sparkle style-pwIlv"
          >
            <svg
              style={{ filter: "drop-shadow(rgb(96, 165, 250) 0px 0px 2px)" }}
              fill="none"
              viewBox="0 0 68 68"
              height="9"
              width="9"
              className="animate-spin-slow"
            >
              <path
                fill="white"
                d="M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z"
              ></path>
            </svg>
          </div>
          <div
            id="style-QmcAd"
            className="pointer-events-none absolute z-10 animate-magic-sparkle style-QmcAd"
          >
            <svg
              style={{ filter: "drop-shadow(rgb(96, 165, 250) 0px 0px 2px)" }}
              fill="none"
              viewBox="0 0 68 68"
              height="5"
              width="5"
              className="animate-spin-slow"
            >
              <path
                fill="white"
                d="M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z"
              ></path>
            </svg>
          </div>
          <div
            id="style-VG2eL"
            className="pointer-events-none absolute z-10 animate-magic-sparkle style-VG2eL"
          >
            <svg
              style={{ filter: "drop-shadow(rgb(96, 165, 250) 0px 0px 2px)" }}
              fill="none"
              viewBox="0 0 68 68"
              height="9"
              width="9"
              className="animate-spin-slow"
            >
              <path
                fill="white"
                d="M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      {show && (
        <div
          onClick={handleClose}
          className="fixed inset-0 z-50 pb-14 flex items-center justify-center bg-black/50 backdrop-blur-[25px] transition-opacity duration-300"
          role="dialog"
          aria-modal="true"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-[70%] max-w-md rounded-[30px] bg-white/5 border border-white/10 backdrop-blur-[40px] shadow-[0_20px_40px_rgba(0,0,0,0.25)] px-10 py-12 flex flex-col items-center"
            style={{
              boxShadow:
                "0 20px 40px rgba(0,0,0,0.25), inset 0 0 40px rgba(0, 0, 0, 0.1)",
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

            <h2 className="relative  text-xl Poppins tracking-tighter  text-gray-300 drop-shadow-md  mb-8 select-none">
              Sign in to Continue
            </h2>

            <div className="w-45 flex justify-between rounded bg-white">
              <button onClick={() => signIn("google")} className="flex ">
                <div className="flex gap-3 justify-between items-center p-2">
                  <Image
                  src="/google.webp"
                  alt="Google logo"
                  width={15}
                  height={15}
                  className=""
                />
                <span className="w-max text-sm whitespace-nowrap">
                  Continue with Google
                </span>
                </div>
              </button>
            </div>

            <div className="flex justify-center gap-1 text-[14px] items-center text-gray-400 pt-2">
              <span className="">made with</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16px"
                viewBox="0 -960 960 960"
                width="16px"
                fill="#F3F3F3"
              >
                <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
              </svg>
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
