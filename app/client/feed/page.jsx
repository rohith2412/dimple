import  Background from "@/app/components/Background";
import FeedPhotos from "@/app/components/FeedPhotos";
import Gears from "@/app/components/Gear";
import Navbar from "@/app/components/Navbar";
import { Report } from "@/app/components/Report";
import React from "react";

const Page = () => {
  return (
    <div>
      <Navbar />
      <Background />
      <FeedPhotos />
       <Report />
      <Gears />
     
    </div>
  );
};

export default Page;
