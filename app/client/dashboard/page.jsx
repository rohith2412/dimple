"use client";
import React from "react";
import Navbar from "../../components/Navbar";
import Alluser from "../../components/Alluser";
import Gear from "../../components/Gear";
import { Report } from "../../components/Report";
import BioCheacker from "../../components/BioCheacker";
import Background from "../../components/Background";
import { Contact } from "../../components/Contact";

const Dashboard = () => {
  return (
    <>
      <div className="">
        <Background />
        <Navbar />
        <BioCheacker />
        <div className="pt-10">
          <Alluser />
        </div>
        <div className="">
          <Gear />
        </div>
        <div className="flex justify-between">
          <Report />
          <Contact />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
