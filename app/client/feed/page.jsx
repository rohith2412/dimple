import  Background from "@/app/components/Background";
import FeedPhotos from "@/app/components/FeedPhotos";
import Gears from "@/app/components/Gear";
import { Report } from "@/app/components/Report";
import React from "react";
import Navbar from "../../components/Navbar";

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
