"use client";

import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import ProfilePicture from "../../components/ProfilePicture";
import Gears from "../../components/Gear";
import  Background from "../../components/Background";
import BioView from "../../components/BioView";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Report } from "../../components/Report";

const Page = () => {
  const router = useRouter();
  const {  status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);


  return (
    <div className="Poppins ">
      <Background />
      <Navbar />
      <div className="pt-10">
        <ProfilePicture />
      </div>
      <BioView />
      <Report />
      <Gears />
    </div>
  );
};

export default Page;
