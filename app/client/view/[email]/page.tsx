import { Background } from '@/app/components/Background'
import Gears from '@/app/components/Gear'
import Navbar from '@/app/components/Navbar'
import ProfileView from '@/app/components/ProfileView'
import React from 'react'

const page = () => {
  return (
    <div>
        <Background />
        <Navbar />
        <div className=''>
        <ProfileView />
        </div>
        <Gears />
    </div>
  )
}

export default page