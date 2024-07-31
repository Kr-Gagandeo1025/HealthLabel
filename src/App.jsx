import React, { useEffect, useState } from 'react'
import AIPrompt from "./components/AIPrompt";
import Nav from "./components/Nav"
import UpImage from "./components/UpImage";
import { useAuth } from './contexts/authContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase/firebase';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Link } from 'react-router-dom';
import { BiHistory } from 'react-icons/bi';

// import { AuthProvider } from './contexts/authContext';
function App() {
  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const [takenimg,setTakenImg] = React.useState(null);
  const {currentUser} = useAuth();
  const [userData,setUserData] = useState("");
  const [genResponse,setGenResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [convo,setConvo] = useState("");
  const [isConvo,setIsConvo] = useState(false);
  let historyData = [];
  const getData = async() =>{
    try{
      const querySnapshot = await getDocs(collection(db, "healthdata"));
      querySnapshot.forEach((doc) => {
        if(doc.data().email === currentUser?.email){
          setUserData(
            `My age is ${doc.data().age}, ${doc.data().gender}, weight is ${doc.data().weight}, height is ${doc.data().height} cm.
            I have ${doc.data().allergies?doc.data().allergies:""} ${doc.data().allergiesSpecific?doc.data().allergiesSpecific:"no"} allergies.
            I have ${doc.data().healthConditions?doc.data().healthConditions:""} ${doc.data().healthConditionsSpecific?doc.data().healthConditionsSpecific:"no"} health conditions. 
            My nutrient concerns are/is ${doc.data().nutrientConcerns?doc.data().nutrientConcerns:""} ${doc.data().nutrientConcersSpecific?doc.data().nutrientConcersSpecific:""}.
            Provide me it's consumptions guidelines. If there are no specific guidelines, provide me a general nutritional content breakdown of the nutrient label.
            `
          )
        };
      });
    }catch(e){
      console.log("Error getting data login please!")
    }
  }
  useEffect(()=>{
    getData()
  })
  const gen = async () => {
    try{
      if(userData !== "") {
        // console.log(userData);
        setLoading(true)
        setGenResponse("");
        const prompt = userData;
        const image = {
          inlineData:{
            data:takenimg.split(',')[1],
            mimeType:'image/png',
          },
        };
        const genResult = await model.generateContent([prompt,image]);
        historyData.push({role:"user",parts:[{text:userData}]});
        setGenResponse(genResult.response.text());
        historyData.push({role:"model",parts:[{text:genResponse}]});
        setLoading(false);
      }else{ 
        setGenResponse("Your health data was not found add your heath data please!!");
      }
    }catch(e){
      setGenResponse("Make sure to upload a nutrient label please");
    }
    
  }
  const handleConvo = (e) =>{
    setConvo(e.target.value);
  }
  const startConvo = async () =>{
    console.log(historyData);
    const chat = model.startChat({
      history: historyData,
      generationConfig: {
        maxOutputTokens: 100,
      },
    });

    
    const msg = convo;
    if(convo!==""){
      setGenResponse("");
      const result = await chat.sendMessage(msg);
      const response = await result.response;
      const text = response.text();
      // console.log(text);
      setGenResponse(text);
      setUserData(convo);
      
    }else{
      console.log("error cannot continue convo...")
    }
    historyData.push({role:"user",parts:[{text:userData}]});
    historyData.push({role:"model",parts:[{text:genResponse}]});
  }
  
  return (
    <div className="flex justify-center items-center sm:-4 bg-gradient-to-br from-slate-50 via-gray-100 to-zinc-200">
      <div className="flex flex-col items-center lg:w-[70%] rounded-lg w-[100%] min-h-screen">
        <Nav page="home"/>
        <div className='flex w-full justify-end items-center p-4 mb-0'>
          <Link to="profile" className='border p-2 rounded-xl'><BiHistory className='text-3xl'/></Link>
        </div>
        <div className="lg:flex-row w-full sm:p-4 flex flex-col justify-center items-center">
          <UpImage takenimg={takenimg} setTakenImg={setTakenImg} isConvo={isConvo}/>
          {currentUser &&
          <AIPrompt img={takenimg} getData={gen} response={genResponse} loading={loading} convo={convo} handleConvo={handleConvo} startConvo={startConvo} isConvo={isConvo} setIsConvo={setIsConvo}/>
          }
          {!currentUser && <p className='text-gray-500 px-5 py-5 text-center'>Login and Fill Health Info to get Prompts</p>}
        </div>
      <p className='text-gray-400 text-bold px-2'>*please do not upload photos that are not food nutrient label and hit on check label. You will just overuse our API with vague requests.</p>
      </div>
    </div>
  );
}

export default App;
