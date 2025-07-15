import  Background from "../../components/Background";
import Gears from '../../components/Gear'
import MatchesPage from '../../components/MatchPage'
import { Report } from "../../components/Report";
import BioCheacker from '../../components/BioCheacker'
import React from 'react'
import Navbar from "../../components/Navbar";

const Page = () => {
  return (
    <div>
      <Navbar/>
      <Background />
      <BioCheacker />
      <MatchesPage />
      <Report />
      <Gears />
      
    </div>
  )
}

export default Page