

import { Background } from '@/app/components/Background'
import Bio from '@/app/components/BioView'
import Navbar from '@/app/components/Navbar'
import React from 'react'

const page = () => {
  return (
    <div>
      <Background />
      <Navbar />
      <Bio />
    </div>
  )
}

export default page