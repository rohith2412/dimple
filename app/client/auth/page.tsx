"use client";

import { Background } from "@/app/components/Background";
import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";

const Auth = () => {
  return (
    <div className="flex justify-center pt-50">
      <Background />
      <button onClick={() => signIn("google")} className="flex p-2 cursor-pointer items-center gap-2 border bg-white rounded">
        <div>
          <Image src="/google.webp" alt="e" width={20} height={20} />
        </div>
        <div className="text-black Poppins">Continue with Google</div>
      </button>
    </div>
  );
};

export default Auth;
