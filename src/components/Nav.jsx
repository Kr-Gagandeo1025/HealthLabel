import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/authContext'
import { doSingOut } from '../firebase/auth'

const Nav = ({page}) => {
  const {userLoggedIn, currentUser} = useAuth();
  return (
    <div className="flex justify-between p-4 items-center w-full border-b">
      <h1 className="sm:text-3xl text-xl font-bold"> <span className="text-red-600">Health</span> <span className="text-black">Label.</span></h1>
      <div className="flex gap-2 justify-center">
        {
          userLoggedIn
          ?
          <>
            {page=="home" && <Link to="profile"><img src={currentUser.photoURL} alt="profilepic" className='h-[40px] w-[40px] rounded-full border-2 border-black'/></Link>}
            <button className="p-1 rounded-full sm:text-xl border border-black border-solid w-[100px] hover:bg-black hover:text-white" onClick={()=>{doSingOut().then(()=>{(<Navigate to={'/'} replace={true}/>)})}}>Logout</button>
          </>
          :
          <>
            <Link to="auth"><button className="p-1  rounded-full sm:text-xl border border-black border-solid w-[100px] bg-black text-white hover:bg-white hover:text-black">Login</button></Link>
          </>

        }
        {page==="profile" && <button className="p-1  rounded-full sm:text-xl border border-black border-solid w-[100px] hover:bg-black hover:text-white"><Link to="/">&lt; Home</Link></button>}
      </div>
    </div>
  )
}

export default Nav
