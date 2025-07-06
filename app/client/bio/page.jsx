import BioForm from '../../components/BioForm'
import { EditProfilePicture } from '../../components/EditProfilePicture'
import Gears from '../../components/Gear'
import React from 'react'
import Background from '../../components/Background'
import Navbar from '../../components/Navbar'

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