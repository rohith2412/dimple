"use client";
import React, { useEffect } from "react";
import "../landing/style.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ShinyText from "../../components/ShinyText";
import Pic from "../../components/Pic";
import Link from "next/link";
import LoginButton from "../../components/LogginButton";
import { Testimonial } from "../../components/Testimonial";
import { Contact } from "../../components/Contact";
import Image from "next/image";

const Landing = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/client/newForm");
    }
  }, [status, router]);

  return (
    <>
      <div className="bg-auto-responsive text-white grid justify-center items-center  w-full">
        <div className="pt-5">
          <div className="flex justify-between lg:gap-200 pt-5  items-center">
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
              <div className="text-[25px] 7777 Poppins font-extrabold text-white drop-shadow-[0_0_7px_rgba(255,255,255,0.8)]">
                <ShinyText text={"Dimple"} />
              </div>
            </div>
            <div className="flex justify-center underline text-gray-600">
              <Link href={"/client/auth"}>
                <ShinyText text={"Join."} />
              </Link>
            </div>
          </div>
        </div>

        <div className="grid w-80 lg:w-full justify-center items-center text-center  pt-20">
          <div className="flex justify-center lg:w-170 text-5xl lg:text-8xl items-center  text-center bold">
            <ShinyText
              text="AI that helps you get paired"
              disabled={false}
              speed={6}
              className="flex justify-center pb-5"
            />
          </div>

          <div className="flex justify-end items-center ">
            <Pic />
          </div>
        </div>
        <div className="flex justify-center items-center pt-10  text-black ">
          <div className="">
            <LoginButton />
          </div>
        </div>
        <div className="flex  justify-center">
          <Testimonial />
        </div>
        
        <div className="fixed text-xs lg:flex lg:justify-center lg:gap-30  gap-10 bottom-0 left-0 right-0  px-4 py-3 flex w-full items-center z-20 shadow-inner justify-center">
          <Link href={"/client/privacy-policy"}>
            <div>Privacy Policy</div>
          </Link>
          <Link href={"/client/terms-and-conditions"}>
            Terms and Conditions
          </Link>
        </div>
      </div>
    </>
  );
};

export default Landing;
