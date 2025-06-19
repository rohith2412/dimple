"use client"
import React, { useEffect, useState } from "react";
import '../landing/style.css';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Landing = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
  };
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/client/dashboard");
    }
  }, [status, router]);

  return (
    
    <div  className="text-white ">
      <div className="grid justify-center pt-50">
        <div className='flex justify-center cherry-bomb-one-regular text-[50px]'>dimple</div>
        <div className="flex justify-center Poppins ">A community of Malayalis 🌴 </div>
        <div className="flex justify-center Poppins">across globe</div>
        <div className="flex justify-center pt-7">
        <Link href={"client/auth"}>
        <button onClick={handleClick} disabled={loading} className="flex justify-center Poppins bg-blue-500 pt-2 pb-2 pl-10 pr-10 rounded-xl">
          {loading ? "loading..." : "Join"}. 
        </button>
        </Link>
        </div>
      </div>

      
    </div>
  );
};

export default Landing;
