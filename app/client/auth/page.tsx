"use client";

import { Background } from "@/app/components/Background";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const Auth = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/client/dashboard");
    }
  }, [status, router]);

  return (
    <div className="flex justify-center pt-70">
      <Background />
      {status === "loading" ? null : !session?.user ? (
        <button
          onClick={() => signIn("google")}
          className="flex p-2 cursor-pointer items-center gap-2 border bg-white rounded-xl"
        >
          <div>
            <Image src="/google.webp" alt="e" width={20} height={20} />
          </div>
          <div className="text-black text-sm">Continue with Google</div>
        </button>
      ) : null}
    </div>
  );
};

export default Auth;