import  Background from "../../components/Background";
import FeedPhotos from "../../components/FeedPhotos";
import Gears from "../../components/Gear";
import { Report } from "../../components/Report";
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
