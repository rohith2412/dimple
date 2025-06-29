import Image from "next/image";
import React from "react";

const Pic = () => {
  return (
    <div className=" flex items-center">
      <div className="relative z-30">
        <Image
          className="rounded-full"
          src="/woman_2.jpg"
          alt="logo"
          height={30}
          width={30}
        />
      </div>
      <div className="relative z-20 -ml-1">
        <Image
          className="rounded-full"
          src="/Men_1.png"
          alt="logo"
          height={30}
          width={30}
        />
      </div>
      <div className="relative z-10 -ml-1">
        <Image
          className="rounded-full"
          src="/woman_1.jpg"
          alt="logo"
          height={30}
          width={30}
        />
      </div>
    </div>
  );
};

export default Pic;
