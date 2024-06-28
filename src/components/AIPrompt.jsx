import React from 'react'
import logo from "../geminilogo.png"
import { TypeAnimation } from 'react-type-animation'
import { bouncy } from 'ldrs'
import { MdSend } from 'react-icons/md'
import { HiChatBubbleLeftRight } from "react-icons/hi2";


bouncy.register()

const AIPrompt = ({img,getData,response, loading, convo, handleConvo, startConvo, isConvo, setIsConvo}) => {
  const handleConvoStart = () =>{
    if(isConvo){
      setIsConvo(false);
    }else{
      setIsConvo(true)
    }
  }
  return (
    <div className='w-full'>
        <div className='flex items-center justify-between px-4 py-2 border m-4 rounded-full'>
            <div className='flex items-center justify-center'>
                <h4 className='bold'>Powered by </h4><img src={logo} className='h-8 w-auto' alt="geminiAI"/>
            </div>
            <div className='flex gap-4 justify-center items-center'>
            {img && response!=="" && <button onClick={handleConvoStart}><HiChatBubbleLeftRight className='sm:text-5xl text-3xl'/></button>}
           {img && !loading && <button className='border border-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white' onClick={getData}>Check Label</button>}
           {loading && <l-bouncy size="45" speed="1.75" color="black"></l-bouncy>}
           </div>
        </div>
       
        <div className='bg-gray-100 border text-black font-bold p-4 max-h-[500px] rounded-lg m-4 overflow-y-scroll flex flex-col text-xl no-scrollbar min-h-[50vh]'>
            {response!=="" && <TypeAnimation sequence={[response]} wrapper='span' speed={50} repeat={0}/>}
        </div>
        {isConvo && <div className="m-4 flex w-full">
          <input type="text" placeholder='start a conversation...' className='pl-4 pr-10 py-4 text-xl rounded-full w-full bg-gray-100 border'
          value={convo}
          onChange={handleConvo}/>
        {convo&&<button className="-translate-x-10" onClick={startConvo}><MdSend className='text-4xl'/></button>}
        </div>}
    </div>
  )
}

export default AIPrompt
