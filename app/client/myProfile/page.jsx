"use client";

import Background from "@/app/components/Background";
import Gears from "@/app/components/Gear";
import MainProfileView from "@/app/components/MainProfileView";
import { Mysettings } from "@/app/components/Mysettings";
import Navbar from "@/app/components/Navbar";
import ViewPhoto from "@/app/components/ViewPhoto";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/client/auth");
    }
  }, [status, router]);

  return (
    <div>
      <Background />
      <Navbar />
      <MainProfileView />

      <Gears />
    </div>
  );
};

export default Page;
