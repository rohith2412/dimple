import { Alluser } from '@/app/components/Alluser'
import { Background } from '@/app/components/Background'
import Navbar from '@/app/components/Navbar'
import React from 'react'

const Dashboard = () => {
    
  return (
    <div>
        <Background />
        <Navbar />
        <Alluser />
    </div>
  )
}

export default Dashboard