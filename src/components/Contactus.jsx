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
        <a href="mailto:kumargagandeo9@gmail.com" target='_blank' rel='noreferrer'><MdEmail/></a>
        <a href="https://github.com/Kr-Gagandeo1025/HealthLabel" target='_blank' rel='noreferrer'><BsGithub/></a>
        <a href="https://www.instagram.com/web.dev.spotlight?igsh=MWkyczU3OGRpeGZ6bA==" target="_blank" rel='noreferrer'><CgInstagram/></a>
        <a href="https://x.com/k_gagandeo?t=krL7rGGEIBPPf59a9Yugxg&s=09" target="_blank" rel='noreferrer'><FiX/></a>
      </div>
    </div>
  )
}

export default Contactus