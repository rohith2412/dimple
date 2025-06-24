"use client"

import { Background } from '@/app/components/Background'
import Gears from '@/app/components/Gear'
import MainProfileView from '@/app/components/MainProfileView'
import Navbar from '@/app/components/Navbar'
import { Photo } from '@/app/components/Photo'
import ViewPhoto from '@/app/components/ViewPhoto'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
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
      <Navbar />
      <div className='pt-8'>
      <MainProfileView />
      </div>
      <ViewPhoto />
      <div className='flex justify-end pb-20'>
        <Photo />
      </div>
      <Gears />
    </div>
  )
}

export default page