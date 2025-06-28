import Link from "next/link";
import React from "react";

const Gears = () => {
  return (
    <div className="">
    
      <div className="fixed bg-white lg:flex lg:justify-center lg:gap-30  bottom-0 left-0 right-0  px-4 py-3 flex w-full items-center z-20 shadow-inner justify-around  ">
        <Link href={"/client/dashboard"}>
            <div className="p-2 rounded-full opacity-60"><svg className="" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill=""><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg></div>
        </Link>
        <Link href={"/client/match"}>
              <div className="p-2 rounded-full opacity-60"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-240Zm-320 80v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440h14q-11 18-16.5 38.5T472-360q-54 1-107.5 14.5T260-306q-9 5-14.5 14t-5.5 20v32h283l80 80H160Zm320-320q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm0-80q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm236 480L576-300q-13-13-18.5-28t-5.5-30q0-32 23-57t59-25q28 0 44 13t38 35q20-20 36.5-34t45.5-14q37 0 59.5 25.5T880-357q0 15-6 30t-18 27L716-160Z"/></svg>                </div>
        </Link>
        <Link href={"/client/feed"}>
            <div className="p-2 rounded-full opacity-60"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M360-400h400L622-580l-92 120-62-80-108 140Zm-40 160q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z"/></svg></div>
        </Link>
        <Link href={"/client/myProfile"}>
        <div className="p-2 rounded-full opacity-60 "><svg className="" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/></svg></div>

        </Link>
      </div>
    </div>
  );
};

export default Gears;
