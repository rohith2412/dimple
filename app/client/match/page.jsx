import Background from "../../components/Background";
import Gears from "../../components/Gear";
import MatchesPage from "../../components/MatchPage";
import { Report } from "../../components/Report";
import BioCheacker from "../../components/BioCheacker";
import React from "react";
import Navbar from "../../components/Navbar";
import { Contact } from "../../components/Contact";

const Page = () => {
  return (
    <div>
      <Navbar />
      <Background />
      <BioCheacker />
      <MatchesPage />
      <div className="flex justify-between">
        <Report />
        <Contact />
      </div>
      <Gears />
    </div>
  );
};

export default Page;
