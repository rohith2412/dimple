"use client";
import React, { useEffect, useState } from "react";
import "../landing/style.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import ShinyText from "@/app/components/ShinyText";
import { LandingBackground } from "@/app/components/LandingBG";
import LogginButton from "@/app/components/LogginButton";

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

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/client/newForm");
    }
  }, [status, router]);


  return (
    
    <div className="text-black flex justify-center items-center ">
      <LandingBackground />
      <div className="grid justify-center pt-50">
        <div className="flex pl-7">
          <div className="flex  justify-center items-center cherry-bomb-one-regular text-[70px]">
            dimple
          </div>
          <div className="pt-2">
          
          </div>
        </div>
        <div className="grid justify-center items-center">
        <div className="flex justify-center items-center"><ShinyText text=" A community of Malayalis"  disabled={false} speed={6} className='custom-class' />🌴</div>
        <div className="flex justify-center items-center"><ShinyText text=" across globe" disabled={false} speed={6} className='custom-class' /></div>
        </div>

        
        <div className="flex justify-center">
          {/* <Link href={"client/auth"}>
            <button
              onClick={handleClick}
              disabled={loading}
              className="flex justify-center Poppins bg-green-400 border-black border pt-2 pb-2 pl-10 pr-10 rounded-xl"
            >
              {loading ? "loading..." : "Join"}.
            </button>
          </Link> */}
          <LogginButton />
        </div>
      </div>
    </div>
  );
};

export default Landing;
