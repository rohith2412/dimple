'use client';

import React from 'react';
import '../client/landing/style.css';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Navbar () {
  const { data: session } = useSession();

  return (
    <div className='flex text-black lg:flex lg:justify-evenly Poppins justify-between p-10 pb-0'>
      <Link href={"/client/dashboard"}>
      <div className='flex cherry-bomb-one-regular text-2xl'>dimple</div>
      </Link>

      <div className='flex text-xs text-gray-300 Poppins items-center gap-15'>
        {session?.user ? (
          <Link href="/client/myProfile">
          <div className='flex items-center gap-2'>
            <span className='text-black lowercase '>Hi, {session.user.name?.split(' ')[0]}</span>
          </div>
          </Link>
        ) : (
          <Link href='/client/auth'>
            <div className='flex text-black hover:text-gray-500 text-xs underline'>
              <button className='cursor-pointer'>join now</button>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height='10px'
                viewBox='0 -960 960 960'
                width='10px'
                fill='#FFFFFF'
              >
                <path d='m216-160-56-56 464-464H360v-80h400v400h-80v-264L216-160Z' />
              </svg>
            </div>
          </Link>
        )}
      </div>
      
    </div>
  );
};

