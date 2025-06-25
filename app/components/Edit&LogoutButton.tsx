import { signOut } from 'next-auth/react';
import Link from 'next/link'
import React, { useState } from 'react'

const EditandLogoutButton = () => {
    
  const [buttonLoading, setButtonLoading] = useState(false);
  const handleClick = () => setButtonLoading(true);
  return (
    <div><div className="pt-6  flex justify-center gap-20">
    <div className="">
      <Link href="/client/bio">
        <button
          onClick={handleClick}
          disabled={buttonLoading}
          className=" py-2 pr-2 pl-2 rounded bg-white text-black transition disabled:opacity-60"
        >
          {buttonLoading ? "Loading..." : "Edit Profile"}
        </button>
      </Link>
    </div>
    <div className="pt-0">
      <button
        onClick={() => signOut()}
        className="w-20 py-2 rounded bg-red-500 text-black"
      >
        Sign Out
      </button>
    </div>
  </div></div>
  )
}

export default EditandLogoutButton