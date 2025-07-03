"use client";

import React from "react";
import "../client/landing/style.css";
import { useSession } from "next-auth/react";
import Link from "next/link";
import ShinyText from "./ShinyText";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="flex text-white lg:flex lg:justify-evenly Poppins justify-between p-10 pb-0">
      <Link href={"/client/dashboard"}>
        <div className="text-[25px] Poppins font-extrabold text-white drop-shadow-[0_0_7px_rgba(255,255,255,0.8)]">
          <ShinyText text={"Dimple"} />
        </div>
      </Link>

      <div className="flex text-xs text-gray-300 Poppins items-center gap-15">
        {session?.user ? (
          <Link href="/client/myProfile">
            <div className="flex items-center gap-2">
              <span className="text-white lowercase">
                <ShinyText text={`Hi, ${session.user.name?.split(" ")[0]}`} />
              </span>
            </div>
          </Link>
        ) : (
          <Link href="/">
            <div className="flex text-white hover:text-gray-500 text-xs underline">
              <button className="cursor-pointer">join now</button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="10px"
                viewBox="0 -960 960 960"
                width="10px"
                fill="#FFFFFF"
              >
                <path d="m216-160-56-56 464-464H360v-80h400v400h-80v-264L216-160Z" />
              </svg>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
