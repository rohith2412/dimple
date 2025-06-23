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
        <div className='pt-10'>
        <EditProfilePicture />
        </div>
        <Gears />
    </div>
  )
}

export default page