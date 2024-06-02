import React from 'react'
import { CgProfile } from 'react-icons/cg'

const Nav = () => {
  return (
    <div className="flex justify-between p-4 items-center w-full border-b">
      <h1 className="sm:text-3xl text-xl font-bold"> <span className="text-red-600">Health</span> <span className="text-black">Label.</span></h1>
      <div className="flex gap-2 justify-center">
        <CgProfile className="sm:h-10 sm:w-10 h-8 w-8"/>
        <button className="p-1  rounded-full sm:text-xl border border-black border-solid w-[100px] hover:bg-black hover:text-white">Profile &gt; </button>
      </div>
    </div>
  )
}

export default Nav
