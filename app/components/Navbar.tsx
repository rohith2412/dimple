import React from 'react'
import '../[frontend]/landing/style.css';

const Navbar = () => {
  return (
    <div className='flex text-white justify-evenly p-10'>
      <div className='flex  cherry-bomb-one-regular text-xl'>dimple</div>
      <div className='flex   text-xs  text-gray-300 Poppins items-center gap-15 hover:'>
        <div className='hover:text-gray-600 transition duration-300'>about</div>
        <div className='hover:text-gray-600 transition duration-300'>partner</div>
        <div className='hover:text-gray-600 transition duration-300'>Contact us</div>
        <div className='flex gap-2 '>
          <button className=' bg-white/5 uppercase backdrop-blur-md  rounded-lg px-4 py-1 text-white  shadow-lg hover:bg-white/10 transition duration-300'>Sign In</button>
          <button className='bg-black text-white hover:bg-gray-900  p-3 pt-2 pb-2 transition duration-300 rounded-xl uppercase'>Get Started</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar