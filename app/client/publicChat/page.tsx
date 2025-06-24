"use client"
import { Background } from '@/app/components/Background'
import PublicChat from '@/app/components/PublicChat'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

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
      <PublicChat />

    </div>
  )
}

export default page