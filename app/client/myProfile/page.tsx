import { Background } from '@/app/components/Background'
import Gears from '@/app/components/Gear'
import MainProfileView from '@/app/components/MainProfileView'
import Navbar from '@/app/components/Navbar'
import { Photo } from '@/app/components/Photo'
import ViewPhoto from '@/app/components/ViewPhoto'
import React from 'react'

const page = () => {
  return (
    <div>
      <Background />
      <Navbar />
      <div className='pt-8'>
      <MainProfileView />
      </div>
      <ViewPhoto />
      <div className='flex justify-end'>
        <Photo />
      </div>
      <Gears />
    </div>
  )
}

export default page