import React from 'react'
import logo from "../geminilogo.png"
import { TypeAnimation } from 'react-type-animation'
import { bouncy } from 'ldrs'

bouncy.register()

const AIPrompt = ({img,getData,response, loading}) => {
  return (
    <div className='w-full'>
        <div className='flex items-center justify-between px-4 py-2 border m-4 rounded-full'>
            <div className='flex items-center justify-center'>
                <h4 className='bold'>Powered by </h4><img src={logo} className='h-8 w-auto' alt="geminiAI"/>
            </div>
           {img && !loading && <button className='border border-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white' onClick={getData}>Check Label</button>}
           {loading && <l-bouncy size="45" speed="1.75" color="black"></l-bouncy>}
        </div>
        <div className='bg-gray-100 border text-black font-bold p-4 max-h-[500px] rounded-lg m-4 overflow-y-scroll flex flex-col text-xl no-scrollbar min-h-[50vh]'>
            {response!=="" && <TypeAnimation sequence={[response]} wrapper='span' speed={50} repeat={0}/>}
        </div>
    </div>
  )
}

export default AIPrompt
