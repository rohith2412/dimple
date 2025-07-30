"use client";

import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import LoginButton from "../../components/LogginButton";
import Link from "next/link";
import { Contact } from "../../components/Contact";

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
      <Navbar />
      <div className="flex justify-center items-center pt-15 pb-10">
        <div className="text-white grid justify-start gap-5 max-w-2xl px-4">
          <h1 className="text-3xl text-center justify-center items-center flex font-semibold">
            Get paid 💸 to create!
          </h1>
          <p className="justify-center items-center flex text-center text-sm">
            Join our 2025 creator Challenge and have a chance to win 100,000
            rupees for posting funny videos{" "}
          </p>

          <p className="text-2xl text-center justify-center items-center flex font-semibold pt-10">
            Get started in 3 easy steps{" "}
          </p>

          <h2 className="text-xl font-semibold mt-4">Step 1: Create</h2>
          <p>
            Create funny, eye-catching, or totally random dating videos to
            promote Dimple!
          </p>

          <h2 className="text-xl font-semibold mt-4">Step 2: Post</h2>
          <p>
            Create content for your audience. Be sure to use #dimpledating in
            caption, and comment "Sign up to dimple (link in bio)” on every
            video you post. <br />
            <br />
            Tiktok, Youtube Shorts and Instagram Reels accepted.
          </p>

          <h2 className="text-xl font-semibold mt-4">Step 3: Get paid</h2>
          <p>
            Every video over 1m + views gets you paid 10,000 rupees.
            <br />
            share the URL of the video to our{" "}
            <Link href={"https://www.instagram.com/dimple_io"}>
              <span className="text-blue-500 underline">Instagram</span>
            </Link>
            <br />
            Must follow step 2 to qualify. Payment method options: Payal, venmo,
            or Zelle. Paid every end of the month.
          </p>

          <h1 className="text-3xl text-center justify-center items-center flex font-semibold">
            Get Started
          </h1>
          <p className="justify-center items-center flex text-center">
            Login or create an account to get started in the creator program
            right now!
          </p>
          <div className="p-2  justify-center items-center flex   ">
            <Link href={"/"}>
              <div className=" text-black bg-white p-2 font-semibold rounded">
                Get Started
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
