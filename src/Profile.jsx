import React from 'react'
import NutrientCheckerForm from './components/NutrientCheckerForm'
import Nav from './components/Nav';
import { useAuth } from './contexts/authContext';

const Profile = () => {
  const {currentUser} = useAuth();
  console.log(currentUser)
  return (
    <div className='flex justify-center items-center'>
        <div className='flex flex-col items-center justify-between sm:w-[90%] rounded-lg w-[100%] shadow-lg'>
        <Nav page="profile"/>
        {currentUser && <h1 className="text-left w-full px-1 font-bold">Hey 👋, {currentUser.displayName}</h1>}
        <NutrientCheckerForm/>
        </div>
    </div>
  )
}

export default Profile
