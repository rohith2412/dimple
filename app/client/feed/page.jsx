import  Background from "../../components/Background";
import FeedPhotos from "../../components/FeedPhotos";
import Gears from "../../components/Gear";
import { Report } from "../../components/Report";
import { Contact } from "../../components/Contact";

import React from "react";
import Navbar from "../../components/Navbar";
import PhotoUploader from "../../components/Photo";

const Page = () => {
  return (
    <div>
      <Navbar />
      <Background />
      <FeedPhotos />
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50">
        <PhotoUploader />
      </div>
      <div className="flex justify-between">
        <Report />
        <Contact />
      </div>
      <Gears />
    </div>
  );
};

export default Page;
