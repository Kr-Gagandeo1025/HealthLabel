import React, { useState } from 'react'
import { doSignInwithGoogle } from '../../firebase/auth'
import { useAuth } from '../../contexts/authContext'
import { Navigate } from 'react-router-dom';
import { GrGoogle } from 'react-icons/gr';

const Login = () => {
  const {userLoggedIn} = useAuth();
  const [isSignedIn, setIsSignIn] = useState(false);
  const onGoogleSignIn = (e) => {
    e.preventDefault();
    if(!isSignedIn){
      setIsSignIn(true)
      doSignInwithGoogle().catch(err=>{
        setIsSignIn(false)
      })
    }
  }
  return (
    <>
    {userLoggedIn && (<Navigate to={'/profile'} replace={true} />)}
    <div className='flex items-center justify-center h-screen'>
      <div className='flex flex-col justify-between items-center p-5 shadow-xl rounded-2xl h-[50%] sm:w-[50%] w-[95%] border-black border'>
        <h1 className="sm:text-5xl text-3xl font-bold"> <span className="text-red-600">Health</span> <span className="text-black">Label.</span></h1>
        <p className='p-2 text-gray-500 text-sm text-left '>*by logging in you agree to share your basic medical data with us for fair use purpose. <br />
            *your data will not be shared with any third party app or web. <br />
            *your data will be stored in our firebase database for quicker responses.
        </p>
        <button onClick={(e)=>{onGoogleSignIn(e)}} className="flex items-center justify-between p-3 gap-2 rounded-full sm:text-xl border border-black border-solid hover:bg-black hover:text-white"> <GrGoogle/> Sign in with Google</button>
      </div>
    </div>
    </>
  )
}

export default Login
