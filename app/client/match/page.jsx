import  Background from "@/app/components/Background";
import Gears from '@/app/components/Gear'
import MatchesPage from '@/app/components/MatchPage'
import { Report } from "@/app/components/Report";
import React from 'react'
import Navbar from "../../components/Navbar";

const Page = () => {
  return (
    <div>
      <Navbar/>
      <Background />
      <MatchesPage />
      <Report />
      <Gears />
      
    </div>
  )
}

export default Page