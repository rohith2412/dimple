"use client"
import Navbar from "../../components/Navbar";


import Alluser from '../../components/Alluser'
import Gear from '../../components/Gear'
import { Report } from '../../components/Report'
import React from 'react'
import BioCheacker from '../../components/BioCheacker'
import Background from '../../components/Background'


const Dashboard = () => {


  return (
    <div className="">
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