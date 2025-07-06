"use client";

import Background from "../../../components/Background";
import Gear from "../../../components/Gear";
import ProfileView from "../../../components/ProfileView";
import Navbar from "../../../components/Navbar";
import { Report } from "../../../components/Report";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

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
      <div className="">
        <ProfileView />
      </div>
      <Report />
      <Gear />
    </div>
  );
};

export default Page;
