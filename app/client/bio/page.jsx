import BioForm from '../../components/BioForm'
import Gears from '../../components/Gear'
import React from 'react'
import Background from '../../components/Background'
import Navbar from '../../components/Navbar'

const page = () => {
  return (
    <div>
        <Navbar />
        <Background />
        <div className='pt-20'>
        
        <BioForm />
        </div>
        <Gears />
    </div>
  )
}

export default page