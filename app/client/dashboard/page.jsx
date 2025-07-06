"use client"


import Alluser from '@/app/components/Alluser'
import Background from '@/app/components/Background'
import Gear from '@/app/components/Gear'
import Navbar from '@/app/components/Navbar'
import { Report } from '@/app/components/Report'
import React from 'react'
import BioCheacker from '@/app/components/BioCheacker'


const Dashboard = () => {


  return (
    <div className="grid justify-center items-center">
        <Background />
        <Navbar />
        <BioCheacker />
        <div className='pt-10'>
        <Alluser />
        </div>
        <div className=''>
          <Gear />
        </div>
        <Report />
    </div>
  )
}

export default Dashboard