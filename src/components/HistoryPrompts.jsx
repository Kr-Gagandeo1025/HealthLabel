import React , { useEffect, useState } from 'react'
import { BsClock } from 'react-icons/bs'
import HistoryCard from './HistoryCard'



const HistoryPrompts = () => {
    const [history,setHistory] = useState([]);
    useEffect(()=>{
        let recentResponses = JSON.parse(localStorage.getItem('recentResponses')) || [];
        console.log(recentResponses);
        setHistory(recentResponses);
    },[]);
    return (
    <div className='flex flex-col border p-4 my-2 w-[90%] rounded-xl max-h-[400px] overflow-y-scroll'>
        <span className='flex items-center gap-2 font-bold text-xl'>Saved Responses <BsClock/></span>
       <div className='flex flex-col gap-2'>
            {
                history.length !== 0 &&
                history.map((h,index)=>(
                    <HistoryCard id={index} title={h.title} content={h.AIResponse} />
                ))
            }
            {history.length === 0 && 
                <span>No Saved Responses</span>
            }
      </div>
    </div>
  )
}

export default HistoryPrompts;