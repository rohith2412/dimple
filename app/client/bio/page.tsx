import { Background } from '@/app/components/Background'
import BioForm from '@/app/components/BioForm'
import { EditProfilePicture } from '@/app/components/EditProfilePicture'
import Gears from '@/app/components/Gear'
import Navbar from '@/app/components/Navbar'
import React from 'react'

const page = () => {
  return (
    <div>
        <Navbar />
        <Background />
        <div className='pt-10'>
        <EditProfilePicture />
        <BioForm />
        </div>
        <Gears />
    </div>
  )
}

export default page