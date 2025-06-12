import React from 'react'
import '../client/landing/style.css';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className='flex text-white justify-between p-10 '>
      <div className='flex  cherry-bomb-one-regular text-2xl'>dimple</div>
      <div className='flex   text-xs  text-gray-300 Poppins items-center gap-15 hover:'>
        
        <Link href={"/client/auth"}>
        <div className='flex hover:text-gray-500 text-xs underline'>
          <button className='cursor-pointer '>join now</button>
          <div><svg xmlns="http://www.w3.org/2000/svg" height="10px" viewBox="0 -960 960 960" width="10px" fill="#FFFFFF"><path d="m216-160-56-56 464-464H360v-80h400v400h-80v-264L216-160Z"/></svg></div>
        </div>
        </Link>
      </div>
    </div>
  )
}

export default Navbar