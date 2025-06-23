

import Alluser from '@/app/components/Alluser'
import { Background } from '@/app/components/Background'
import Gears from '@/app/components/Gear'

import Navbar from '@/app/components/Navbar'
import React from 'react'

const Dashboard = () => {
    
  return (
    <div>
        <Background />
        <Navbar />
        <div className='pt-10'>
        <Alluser />
        </div>
        <div className=''>
          <Gears />
        </div>
    </div>
  )
}

export default Dashboard