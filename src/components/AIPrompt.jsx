import React from 'react'
import logo from "../geminilogo.png"

const AIPrompt = ({img}) => {
  return (
    <div className='w-full'>
        <div className='flex items-center justify-between p-2 border m-4 rounded-full'>
            <div className='flex items-center justify-center'>
                <h4 className='bold'>Powered by </h4><img src={logo} className='h-8 w-auto' alt="geminiAI"/>
            </div>
           {img && <button className='border border-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white'>Check Label</button>}
        </div>
        <div >
            <p>prompt</p>
        </div>
    </div>
  )
}

export default AIPrompt
