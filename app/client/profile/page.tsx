

import { Background } from '@/app/components/Background'
import BioView from '@/app/components/BioView'
import Navbar from '@/app/components/Navbar'
import ProfilePicture from '@/app/components/ProfilePicture'
import React from 'react'

const page = () => {
  return (
    <div>
      <Background />
      <Navbar />
      <ProfilePicture />
      <BioView />
    </div>
  )
}

export default page