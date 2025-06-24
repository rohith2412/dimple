"use client"

import Alluser from '@/app/components/Alluser'
import { Background } from '@/app/components/Background'
import Gears from '@/app/components/Gear'

import Navbar from '@/app/components/Navbar'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Dashboard = () => {
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
        <div className='pt-10'>
        <Alluser />
        </div>
        <div className=''>
          <Gears />
        </div>
    </div>
  )
}

export default Dashboard