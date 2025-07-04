import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

const EditandLogoutButton = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="grid justify-center gap-2  items-center ">
      <div className="">
        <Link href="/client/bio" className="">
          <button
            onClick={() => setLoading(true)}
            disabled={loading}
            className="flex justify-center items-center  gap-2 h-10  bg-white rounded-md "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#434343"
            >
              <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
            </svg>
            <div className="text-black">
              {loading ? "Loading..." : "Edit Profile"}
            </div>
          </button>
        </Link>
      </div>
      <div>
        <div className="">
          <button
            onClick={() => signOut()}
            className="flex justify-center items-center  gap-3 h-10  bg-red-500 rounded-md "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#000000"
            >
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
            </svg>
            <div className="text-black">Sign Out</div>
            
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditandLogoutButton;
