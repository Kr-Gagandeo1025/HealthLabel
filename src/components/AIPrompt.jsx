import React, { useState } from 'react'
import logo from "../geminilogo.png"
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { bouncy } from 'ldrs'
import { MdCheckCircle, MdCopyAll, MdSave, MdSend, MdShare } from 'react-icons/md'
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import useTypingEffect from './hooks/useTypingEffect';
import { RWebShare } from 'react-web-share';


bouncy.register()

const AIPrompt = ({img,getData,response, loading, convo, handleConvo, startConvo, isConvo, setIsConvo}) => {
  const handleConvoStart = () =>{
    if(isConvo){
      setIsConvo(false);
    }else{
      setIsConvo(true)
    }
  }
  const typedResponse = useTypingEffect(response,50);
  const [textCopied,setTextCopied] = useState(false);
  const [showSaveDialog,setShowSaveDialog] = useState("hidden");
  const [saveTitle,setSaveTitle] = useState("");
  const [isSaved,setIsSaved] = useState(false);

  const CopyResponse =  () => {
    navigator.clipboard.writeText(response);
    setTextCopied(true);
  }

  const handleSaveTitleChange = (e) => {
    e.preventDefault();
    setSaveTitle(e.target.value);
  }

  const SaveResponse = () => {

    const responseMetadata = {
      title:saveTitle,
      AIResponse:response
    }
    let recentResponses = JSON.parse(localStorage.getItem('recentResponses')) || [];
    recentResponses = recentResponses.filter(r => r.title !== saveTitle);
    recentResponses.unshift(responseMetadata);
    if (recentResponses.length > 5) recentResponses.pop();
    localStorage.setItem('recentResponses',JSON.stringify(recentResponses));
    setShowSaveDialog("hidden");
    setSaveTitle("");
    setIsSaved(true);

  }
  return (
    <div className='w-full'>
      <div className={`fixed h-[150px] w-[300px] border border-black rounded-xl top-[50%] md:left-[50%] left-[10%] bg-white ${showSaveDialog} items-center justify-center flex-col p-4 gap-4 shadow-xl`}>
        <input type="text" value={saveTitle} onChange={handleSaveTitleChange} placeholder='Title for Saving' className='outline-none border-b text-lg'/>
        <div className='flex gap-2 w-full justify-between'>
          {saveTitle !== "" && 
            <button className='flex text-xl bg-blue-500 rounded-xl p-2 items-center gap-2 self-start' onClick={SaveResponse}>Save <MdSave/></button>
          }
          <button className='p-2 bg-red-500 text-xl rounded-xl'>Cancel</button>
        </div>
      </div>
        <div className='flex items-center justify-between px-4 py-2 border m-4 rounded-full'>
            <div className='flex items-center justify-center'>
                <h4 className='bold'>Powered by </h4><img src={logo} className='h-8 w-auto' alt="geminiAI"/>
            </div>
            <div className='flex gap-4 justify-center items-center'>
            {img && response!=="" && <button onClick={handleConvoStart}><HiChatBubbleLeftRight className='sm:text-5xl text-3xl'/></button>}
           {img && !loading && <button className='border border-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white transition-all ease-in-out' onClick={getData}>Check Label</button>}
           {loading && <l-bouncy size="45" speed="1.75" color="black"></l-bouncy>}
           </div>
        </div>
       
        <div className='bg-gray-100 border text-black font-bold p-4 max-h-[500px] rounded-lg m-4 overflow-y-scroll flex flex-col text-xl no-scrollbar min-h-[50vh] markdown-body'>
            {response!=="" && response!==undefined && 
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{typedResponse}</ReactMarkdown>
            }
            {response !== "" &&
            <div className='flex gap-3 items-center w-full justify-end cursor-pointer'>
              {isSaved?<MdCheckCircle className='text-green-400'/>:<MdSave onClick={()=>{setShowSaveDialog("flex")}}/>}
              {textCopied?<MdCheckCircle className='text-green-400'/>:<MdCopyAll onClick={CopyResponse}/>}
              <RWebShare
                data={{
                  text:"Response for Your Scaned Label.",
                  title:"Use Health-Label Now.",
                  url:response
                }}
              >
                <MdShare/>
              </RWebShare>
            </div>
            }
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
