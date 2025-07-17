"use client";
import React from "react";
import "../client/landing/style.css";
import { useSession } from "next-auth/react";
import Link from "next/link";
import ShinyText from "./ShinyText";
import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="flex text-white lg:flex lg:justify-evenly Poppins justify-between p-10 pb-0">
      <Link href={"/client/dashboard"}>
        <div className="flex gap-2 items-center justify-center">
            <div>
              <Image
                src={"/logo.webp"}
                alt={"User"}
                width={30}
                height={30}
                className=" aspect-square rounded-full object-cover"
              />
            </div>
            <div className="text-[25px] Poppins font-extrabold text-white drop-shadow-[0_0_7px_rgba(255,255,255,0.8)]">
              <ShinyText text={"Dimple"} />
            </div>
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
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
