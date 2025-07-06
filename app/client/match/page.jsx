import  Background from "../../components/Background";
import Gears from '../../components/Gear'
import MatchesPage from '../../components/MatchPage'
import { Report } from "../../components/Report";
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