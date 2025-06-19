import { Background } from '@/app/components/Background'
import EditProfilePicture from '@/app/components/EditProfilePicture'
import Navbar from '@/app/components/Navbar'
import React from 'react'

const page = () => {
  return (
    <div>
        <Background />
        <Navbar />
        <EditProfilePicture />
    </div>
  )
}

export default page