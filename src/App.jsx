import React, { useEffect, useState } from 'react'
import AIPrompt from "./components/AIPrompt";
import Nav from "./components/Nav"
import UpImage from "./components/UpImage";
import { useAuth } from './contexts/authContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase/firebase';
import { GoogleGenerativeAI } from '@google/generative-ai';

// import { AuthProvider } from './contexts/authContext';
function App() {
  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
  const [takenimg,setTakenImg] = React.useState(null);
  const {currentUser} = useAuth();
  const [userData,setUserData] = useState("");
  const [genResponse,setGenResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const getData = async() =>{
    const querySnapshot = await getDocs(collection(db, "healthdata"));
    querySnapshot.forEach((doc) => {
      if(doc.data().email === currentUser.email){
        setUserData(
          `My age is ${doc.data().age}, ${doc.data().gender}, weight is ${doc.data().weight}, height is ${doc.data().height} cm.
          My allergies are/is ${doc.data().allergies}. My health Conditions are/is ${doc.data().healthConditions}.
          My nutrient concerns are/is ${doc.data().nutrientConcerns}. Is the food with provided Nutrient Label is good for my consumption.
          Provide me it's consumptions guidelines.
          `
        )
      };
    });
  }
  useEffect(()=>{
    getData()
  },[])
  const gen = async () => {
    try{
      if(userData !== "") {
        setLoading(true)
        setGenResponse("");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = userData;
        const image = {
          inlineData:{
            data:takenimg.split(',')[1],
            mimeType:'image/png',
          },
        };
        const genResult = await model.generateContent([prompt,image]);
        setGenResponse(genResult.response.text());
        setLoading(false);
      }else{ 
        setGenResponse("Your health data was not found add your heath data please!!");
      }
    }catch(e){
      setGenResponse("Make sure to upload a nutrient label please");
    }
    
  }
  return (
    <div className="flex justify-center items-center sm:-4">
      <div className="flex flex-col items-center sm:w-[70%] rounded-lg w-[100%] min-h-screen">
        <Nav page="home"/>
        <div className="sm:flex w-full sm:p-10">
          <UpImage takenimg={takenimg} setTakenImg={setTakenImg}/>
          {currentUser &&
          <AIPrompt img={takenimg} getData={gen} response={genResponse} loading={loading}/>
          }
          {!currentUser && <p className='text-gray-500 px-5 py-5 text-center'>Login and Fill Health Info to get Prompts</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
