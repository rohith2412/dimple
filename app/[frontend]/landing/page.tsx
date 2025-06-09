import React from 'react'
import '../landing/style.css';

const Landing = () => {
  return (
    <div className='flex justify-between p-10'>
      <div className='flex  cherry-bomb-one-regular text-3xl'>dimple</div>
      <div className='flex  Poppins items-center gap-15 hover:'>
        <div className=''>about</div>
        <div className=''>partner</div>
        <div className=''>Contact us</div>
        <button className='bg-black text-white p-2 pt-1 pb-1 rounded-xl'>Join</button>
      </div>
      
    </div>
  )
}

export default Landing