import React from 'react'
import AIPrompt from "./components/AIPrompt";
import Nav from "./components/Nav"
import UpImage from "./components/UpImage";
function App() {
  const [takenimg,setTakenImg] = React.useState(null);
  return (
    <div className="flex justify-center items-center sm:-4">
      <div className="flex flex-col items-center justify-between sm:w-[50%] rounded-lg w-[100%] shadow-lg">
        <Nav/>
        <UpImage takenimg={takenimg} setTakenImg={setTakenImg}/>
        <AIPrompt img={takenimg}/>
        <h2>body</h2>
      </div>
    </div>
  );
}

export default App;
