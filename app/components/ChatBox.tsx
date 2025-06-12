import React from "react";
import Pic from "./Pic";

const ChatBox = () => {
  return (
    <div
      className=" text-gray-400 text-sm bg-white/5 rounded-lg p-4 w-fit"
      style={{ backdropFilter: "blur(2px)" }}
    >
      <div>
        <Pic />
      </div>
      <div className="pt-4 pl-4">
        <div>
          <span className="font-bold">Anne</span> joined Dimple now{" "}
          <span className="pl-10 text-xs text-gray-500">5 sec ago</span>
        </div>
        <div>
            <span className="font-bold">Mathew</span> shared a post{" "}
          <span className="pl-10 text-xs text-gray-500">10 min ago</span>
            
        </div>
        <div>
            
            <span className="font-bold">Diana</span> changed location to <span className="pl-10 text-xs text-gray-500">10 min ago</span> <br />Toronto{" "}
          
            </div>
      </div>
    </div>
  );
};

export default ChatBox;
