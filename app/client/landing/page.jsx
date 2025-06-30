"use client";
import React, { useEffect } from "react";
import "../landing/style.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ShinyText from "../../components/ShinyText";
import LoginButton from "../../components/LogginButton";

const Landing = () => {
  const { status } = useSession();
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
    
    <div className="text-white  flex justify-center items-center ">

      <div className="grid justify-center pt-50">
        <div className="flex pl-7">
          <div className="flex  justify-center items-center cherry-bomb-one-regular text-[70px]">
            dimple
          </div>
          <div className="pt-2">
          
          </div>
        </div>
        <div className="grid justify-center items-center">
        <div className="flex justify-center  items-center"><ShinyText text=" A community of Gen-Z "  disabled={false} speed={6} className='custom-class' /> 🌴</div>
        <div className="flex justify-center items-center"><ShinyText text=" across globe" disabled={false} speed={6} className='custom-class' /></div>
        </div>

        
        <div className="flex justify-center">


        <LoginButton />
        </div>
      </div>
    </div>
  );
};

export default Landing;
