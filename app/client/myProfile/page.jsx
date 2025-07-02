"use client";

import Background from "@/app/components/Background";
import Gears from "@/app/components/Gear";
import MainProfileView from "@/app/components/MainProfileView";
import Navbar from "@/app/components/Navbar";
import { Report } from "@/app/components/Report";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  return (
    <div>
      <Background />
      <Navbar />
      <MainProfileView />
      <Report />
      <Gears />
    </div>
  );
};

export default Page;
