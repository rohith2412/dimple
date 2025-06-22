import { Background } from '@/app/components/Background'
import { EditProfilePicture } from '@/app/components/EditProfilePicture'
import Gears from '@/app/components/Gear'
import Navbar from '@/app/components/Navbar'
import React from 'react'

const page = () => {
  return (
    <div>
        <Background />
        <Navbar />
        <EditProfilePicture />
        <Gears />
    </div>
  )
}

export default page