"use client"
import { Background } from '@/app/components/Background'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const Page = () => {
  const router = useRouter();
  const {  status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/client/auth");
    }
  }, [status, router]);


  return (
    <div>
      <Background />

    </div>
  )
}

export default Page