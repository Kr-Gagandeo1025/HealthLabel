import React, { useState } from 'react'
import AIPrompt from "./components/AIPrompt";
import Nav from "./components/Nav"
import UpImage from "./components/UpImage";
import { useAuth } from './contexts/authContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase/firebase';

// import { AuthProvider } from './contexts/authContext';
function App() {
  const [takenimg,setTakenImg] = React.useState(null);
  const {currentUser} = useAuth();
  const [userData,setUserData] = useState(null);
  const getData = async() =>{
    const querySnapshot = await getDocs(collection(db, "healthdata"));
    querySnapshot.forEach((doc) => {
      if(doc.data().email === currentUser.email){
        setUserData(doc.data())
      };
    });
  }
  return (
    <div className="flex justify-center items-center sm:-4">
      <div className="flex flex-col items-center sm:w-[70%] rounded-lg w-[100%] min-h-screen">
        <Nav page="home"/>
        <div className="sm:flex w-full sm:p-10">
          <UpImage takenimg={takenimg} setTakenImg={setTakenImg}/>
          {currentUser &&
          <AIPrompt img={takenimg}/>
          }
          {!currentUser && <p className='text-gray-500 px-5 py-5 text-center'>Login and Fill Health Info to get Prompts</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
