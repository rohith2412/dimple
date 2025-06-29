import  Background from "@/app/components/Background";
import Gears from '@/app/components/Gear'
import MatchesPage from '@/app/components/MatchPage'
import Navbar from '@/app/components/Navbar'
import React from 'react'

const Page = () => {
  return (
    <div>
      <Navbar/>
      <Background />
      <MatchesPage />
      <Gears />
    </div>
  )
}

export default Page