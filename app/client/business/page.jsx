import React from 'react'
import Navbar from '../../components/Navbar'

const page = () => {
  return (
    <div>
        <Navbar />
        <div className='grid text-gray-400 underline pt-50 justify-center text-2xl '>
            <div className='flex items-center'>Earn money<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#B7B7B7"><path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"/></svg></div>
            <div className='flex items-center'>Promotion<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#B7B7B7"><path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"/></svg></div>
            <div className='flex items-center'>Carriers<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#B7B7B7"><path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"/></svg></div>
        </div>
    </div>
  )
}

export default page