import React from 'react'
import { BsGithub } from 'react-icons/bs'
import { CgInstagram} from 'react-icons/cg'
import { FiX } from 'react-icons/fi'
import { MdEmail } from 'react-icons/md'

const Contactus = () => {
  return (
    <div className='flex flex-col border p-4 my-2 w-[90%] rounded-xl'>
      <h1 className='text-xl font-bold'>Reach us via</h1>
      <div className='flex gap-3 text-3xl p-4 justify-center items-center'>
        <MdEmail/>
        <BsGithub/>
        <CgInstagram/>
        <FiX/>
      </div>
    </div>
  )
}

export default Contactus