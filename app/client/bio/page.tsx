import { Background } from '@/app/components/Background'
import BioForm from '@/app/components/BioForm'
import Gears from '@/app/components/Gear'
import Navbar from '@/app/components/Navbar'
import React from 'react'

const page = () => {
  return (
    <div>
        <Navbar />
        <Background />
        <BioForm />
        <Gears />
    </div>
  )
}

export default page