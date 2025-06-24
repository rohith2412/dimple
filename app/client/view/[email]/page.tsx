"use client";
import { Background } from "@/app/components/Background";
import Gears from "@/app/components/Gear";
import Navbar from "@/app/components/Navbar";
import ProfileView from "@/app/components/ProfileView";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/client/auth");
    }
  }, [status, router]);

  return (
    <div>
      <Background />
      <Navbar />
      <div className="">
        <ProfileView />
      </div>
      <Gears />
    </div>
  );
};

export default page;
