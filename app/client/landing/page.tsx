"use client";
import React, { useEffect, useState } from "react";
import "../landing/style.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Landing = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
  };
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/client/dashboard");
    }
  }, [status, router]);

  return (
    <div className="text-black ">
      <div className="grid justify-center pt-50">
        <div className="flex pl-7">
          <div className="flex  justify-center items-center cherry-bomb-one-regular text-[70px]">
            dimple
          </div>
          <div className="pt-2">
          <Image
            src="/crock.png"
            width={100}
            height={100}
            alt="Alien Croc"
            className="h-20"
          />
          </div>
        </div>
        <div className="flex justify-center Poppins  top-0">
          A community of Malayalis 🌴{" "}
        </div>
        <div className="flex justify-center Poppins">across globe</div>
        <div className="flex justify-center pt-7">
          <Link href={"client/auth"}>
            <button
              onClick={handleClick}
              disabled={loading}
              className="flex justify-center Poppins bg-green-400 border-black border pt-2 pb-2 pl-10 pr-10 rounded-xl"
            >
              {loading ? "loading..." : "Join"}.
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
