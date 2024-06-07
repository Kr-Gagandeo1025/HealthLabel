import React from 'react'
import AIPrompt from "./components/AIPrompt";
import Nav from "./components/Nav"
import UpImage from "./components/UpImage";
// import { AuthProvider } from './contexts/authContext';
function App() {
  const [takenimg,setTakenImg] = React.useState(null);
  return (
    <div className="flex justify-center items-center sm:-4">
      <div className="flex flex-col items-center sm:w-[70%] rounded-lg w-[100%] min-h-screen">
        <Nav page="home"/>
        <div className="sm:flex w-full sm:p-10">
          <UpImage takenimg={takenimg} setTakenImg={setTakenImg}/>
          <AIPrompt img={takenimg}/>
        </div>
      </div>
    </div>
  );
}

export default App;
