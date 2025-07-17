"use client";

import Background from "../../../components/Background";
import Gear from "../../../components/Gear";
import ProfileView from "../../../components/ProfileView";
import Navbar from "../../../components/Navbar";
import { Report } from "../../../components/Report";
import { Contact } from "../../../components/Contact";
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
      <div className="flex justify-between">
        <Report />
        <Contact />
      </div>
      <Gear />
    </div>
  );
};

export default Page;
