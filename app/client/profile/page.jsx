"use client";

import React, { useEffect } from "react";
import Navbar from "@/app/components/Navbar";
import ProfilePicture from "@/app/components/ProfilePicture";
import Gears from "@/app/components/Gear";
import  Background from "@/app/components/Background";
import BioView from "@/app/components/BioView";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Page = () => {
  const router = useRouter();
  const {  status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);


  return (
    <div className="Poppins">
      <Background />
      <Navbar />
      <div className="pt-10">
        <ProfilePicture />
      </div>
      <BioView />
      
      <Gears />
    </div>
  );
};

export default Page;
