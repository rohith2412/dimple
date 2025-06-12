import React from "react";
import Navbar from "@/app/components/Navbar";
import Heading from "@/app/components/Heading";
import { TopBar } from "@/app/components/TopBar";
import { Background } from "@/app/components/Background";
import Button from "@/app/components/Button";
import ChatBox from "@/app/components/ChatBox";


const Landing = () => {
  return (
    <div>
      <Background />
      <TopBar />
      <Navbar />
      <Heading />
      <div className="flex justify-center pt-10">
        <Button />
      </div>
      <div className="pt-10 flex justify-center ">
        <ChatBox />
      </div>
      

      
    </div>
  );
};

export default Landing;
