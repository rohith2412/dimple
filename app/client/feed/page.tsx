import { Background } from '@/app/components/Background'
import FeedPhotos from '@/app/components/FeedPhotos'
import Gears from '@/app/components/Gear'
import Navbar from '@/app/components/Navbar'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
      <Navbar />
      <Background />
      <FeedPhotos />
      <Gears />
      </div>
  )
}

export default page