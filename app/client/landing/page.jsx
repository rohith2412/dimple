"use client";
import React, { useEffect } from "react";
import "../landing/style.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ShinyText from "../../components/ShinyText";
import LoginButton from "../../components/LogginButton";
import Carousel from "../../components/Carousel";

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
    <div className="bg-auto-responsive text-white grid justify-center items-center min-h-screen w-full">
      <div classname="flex justify-center ">
        <div>0</div>
        <div>0</div>
      </div>
      <div className="text-[64px] font-extrabold text-white drop-shadow-[0_0_7px_rgba(255,255,255,0.8)]">
        Dimple.
      </div>
      <div className="grid justify-center items-center">
        <div className="flex justify-center items-center">
          <ShinyText
            text=" A community of Gen-Z "
            disabled={false}
            speed={6}
            className="custom-class"
          />
          🌴
        </div>
        <div className="flex justify-center items-center">
          <ShinyText
            text=" across globe"
            disabled={false}
            speed={6}
            className="custom-class"
          />
        </div>
      </div>

      <div style={{ height: "600px", position: "relative" }}>
        <Carousel
          baseWidth={300}
          autoplay={true}
          autoplayDelay={3000}
          pauseOnHover={true}
          loop={true}
          round={false}
        />
      </div>

      <div className="flex justify-center">
        <LoginButton />
      </div>
    </div>
  );
};

export default Landing;
