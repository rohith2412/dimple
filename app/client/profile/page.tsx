'use client'

import React from 'react'
import Navbar from '@/app/components/Navbar'
import ProfilePicture from '@/app/components/ProfilePicture'
import Gears from '@/app/components/Gear'
import { Background } from '@/app/components/Background'
import BioView from '@/app/components/BioView'

const Page = () => {
  return (
    <div className="">
      <Background />
      <Navbar />
      <div className='pt-10'>
      <ProfilePicture />
      </div>
      <BioView />
      <Gears />
    </div>
  )
}

export default Page
