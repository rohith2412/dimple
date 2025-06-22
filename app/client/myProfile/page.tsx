import { Background } from '@/app/components/Background'
import Gears from '@/app/components/Gear'
import MainProfileView from '@/app/components/MainProfileView'
import Navbar from '@/app/components/Navbar'
import React from 'react'

const page = () => {
  return (
    <div>
      <Background />
      <Navbar />
      <MainProfileView />
      <Gears />
    </div>
  )
}

export default page