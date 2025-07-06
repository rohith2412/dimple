import BioForm from '@/app/components/BioForm'
import { EditProfilePicture } from '@/app/components/EditProfilePicture'
import Gears from '@/app/components/Gear'
import React from 'react'
import Background from '../../components/Background'

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