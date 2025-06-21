import { Background } from '@/app/components/Background'
import Navbar from '@/app/components/Navbar'
import ProfileView from '@/app/components/ProfileView'
import React from 'react'

const page = () => {
  return (
    <div>
        <Background />
        <Navbar />
        <ProfileView />
    </div>
  )
}

export default page