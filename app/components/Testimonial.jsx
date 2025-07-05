import Image from "next/image";
import React from "react";

// bg-[rgb(240,219,101)] 

export const Testimonial = () => {
  return (
    <div className="w-full pt-17">
      <div className="flex flex-col items-center">
        <div className="one relative z-10 mb-[-35px] transform -translate-x-6">
          <div className="flex text-black p-2 rounded-md bg-[rgb(249,251,220)] items-center justify-center scale-70">
            <div className="flex justify-center items-center">
              <div>
                <Image
                  src="https://res.cloudinary.com/dm4r19erl/image/upload/v1751128918/bc9f2eb162a86a5a9607eaca7395f950_etbvks.jpg"
                  width={50}
                  height={50}
                  alt="image"
                  priority
                  quality={100}
                  className="w-14 h-14 aspect-square rounded-full object-cover"
                />
              </div>
              <div className="grid justify-center items-center">
                <div className="flex justify-start items-center pl-5">Paul</div>
                <div className="flex justify-center items-center text-xs text-gray-700">
                  📍 US, california
                </div>
              </div>
            </div>

            <div className="flex scale-75 items-center justify-center">
              <svg
                viewBox="0 0 512 512"
                width="30"
                height="30"
                className="animate-pulse drop-shadow-lg"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ff6ec4" />
                    <stop offset="100%" stopColor="#7873f5" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <circle cx="256" cy="256" r="130" fill="url(#glow1)" />
                <path
                  d="M256 464s-192-112-192-272c0-70.7 57.3-128 128-128 41.2 0 77.8 20.1 100 51.3C314.2 84.1 350.8 64 392 64c70.7 0 128 57.3 128 128 0 160-192 272-192 272s-9.4 6-32 6-32-6-32-6z"
                  fill="#ff6ec4"
                />
              </svg>
            </div>

            <div className="flex justify-center items-center">
              <div className="grid">
                <div className="text-sm flex justify-end font-semibold pr-2">
                  Helen
                </div>
                <div className="text-xs text-gray-700">📍 US, California</div>
              </div>
              <Image
                src="https://res.cloudinary.com/dm4r19erl/image/upload/v1751128820/c72bc568-f445-4973-9b56-5ba1df27b59a_dwsygz.jpg"
                width={56}
                height={56}
                alt="Helen"
                priority
                quality={100}
                sizes="56px"
                className="w-14 h-14 rounded-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="two relative z-20 w-fit transform translate-x-6">
          <div className="flex text-black p-2 rounded-md bg-[rgb(240,219,101)] items-center justify-center scale-70">
            <div className="flex justify-center items-center">
              <div>
                <Image
                  src="https://res.cloudinary.com/dm4r19erl/image/upload/v1750950675/arcej4dnqydqx66uhpkq.jpg"
                  width={50}
                  height={50}
                  alt="image"
                  priority
                  quality={100}
                  className="w-14 h-14 aspect-square rounded-full object-cover"
                />
              </div>
              <div className="grid justify-center items-center">
                <div className="flex justify-start items-center pl-5">Rohith</div>
                <div className="flex justify-center items-center text-xs text-gray-700">
                  📍 IN, kerala
                </div>
              </div>
            </div>

            <div className="flex scale-75 items-center justify-center">
              <svg
                viewBox="0 0 512 512"
                width="30"
                height="30"
                className="animate-pulse drop-shadow-lg"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <radialGradient id="glow2" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ff6ec4" />
                    <stop offset="100%" stopColor="#7873f5" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <circle cx="256" cy="256" r="130" fill="url(#glow2)" />
                <path
                  d="M256 464s-192-112-192-272c0-70.7 57.3-128 128-128 41.2 0 77.8 20.1 100 51.3C314.2 84.1 350.8 64 392 64c70.7 0 128 57.3 128 128 0 160-192 272-192 272s-9.4 6-32 6-32-6-32-6z"
                  fill="#ff6ec4"
                />
              </svg>
            </div>

            <div className="flex justify-center items-center">
              <div className="grid">
                <div className="text-sm flex justify-end font-semibold pr-2">
                  Helen
                </div>
                <div className="text-xs text-gray-700">📍 IN, kerala</div>
              </div>
              <Image
                src="https://res.cloudinary.com/dm4r19erl/image/upload/v1751489218/snzf1oybbgxl203pvyrk.jpg"
                width={56}
                height={56}
                alt="Helen"
                priority
                quality={100}
                sizes="56px"
                className="w-14 h-14 rounded-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="one relative z-10 -mt-7 transform -translate-x-1">
          <div className="flex text-black p-2 rounded-md bg-[rgb(249,251,220)] items-center justify-center scale-70">
            <div className="flex justify-center items-center">
              <div>
                <Image
                  src="https://res.cloudinary.com/dm4r19erl/image/upload/v1751128978/4b4992619f7a11a5247cd316bf718ac1_dkxrup.jpg"
                  width={50}
                  height={50}
                  alt="image"
                  priority
                  quality={100}
                  className="w-14 h-14 aspect-square rounded-full object-cover"
                />
              </div>
              <div className="grid justify-center items-center">
                <div className="flex justify-start items-center pl-5">Joye</div>
                <div className="flex justify-center items-center text-xs text-gray-700">
                  📍 CA, Ontario
                </div>
              </div>
            </div>

            <div className="flex scale-75 items-center justify-center">
              <svg
                viewBox="0 0 512 512"
                width="30"
                height="30"
                className="animate-pulse drop-shadow-lg"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ff6ec4" />
                    <stop offset="100%" stopColor="#7873f5" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <circle cx="256" cy="256" r="130" fill="url(#glow1)" />
                <path
                  d="M256 464s-192-112-192-272c0-70.7 57.3-128 128-128 41.2 0 77.8 20.1 100 51.3C314.2 84.1 350.8 64 392 64c70.7 0 128 57.3 128 128 0 160-192 272-192 272s-9.4 6-32 6-32-6-32-6z"
                  fill="#ff6ec4"
                />
              </svg>
            </div>

            <div className="flex justify-center items-center">
              <div className="grid">
                <div className="text-sm flex justify-end font-semibold pr-2">
                  Tessa
                </div>
                <div className="text-xs text-gray-700">📍 CA, Ontario</div>
              </div>
              <Image
                src="https://res.cloudinary.com/dm4r19erl/image/upload/v1751128750/e9a63f055e462a2f948baa930db5f253_ezcypc.jpg"
                width={56}
                height={56}
                alt="Helen"
                priority
                quality={100}
                sizes="56px"
                className="w-14 h-14 rounded-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};