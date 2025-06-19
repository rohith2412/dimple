import { Background } from '@/app/components/Background'
import BioForm from '@/app/components/BioForm'
import Navbar from '@/app/components/Navbar'
import React from 'react'

const page = () => {
  return (
    <div>
        <Navbar />
        <Background />
        <BioForm />
    </div>
  )
}

export default page