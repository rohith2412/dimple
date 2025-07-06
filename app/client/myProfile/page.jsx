"use client";

import Background from "../../components/Background";
import Gears from "../../components/Gear";
import MainProfileView from "../../components/MainProfileView";
import { Report } from "../../components/Report";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";

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
