import { Alluser } from '@/app/components/Alluser'
import Navbar from '@/app/components/Navbar'
import ProfileUploader from '@/app/components/profilepic'
import React from 'react'

const Dashboard = () => {
    
  return (
    <div>
        <Navbar />
        <Alluser />
        <ProfileUploader />
    </div>
  )
}

export default Dashboard