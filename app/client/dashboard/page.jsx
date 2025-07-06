"use client"
import Navbar from "../../components/Navbar";


import Alluser from '@/app/components/Alluser'
import Gear from '@/app/components/Gear'
import { Report } from '@/app/components/Report'
import React from 'react'
import BioCheacker from '@/app/components/BioCheacker'
import Background from '../../components/Background'


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