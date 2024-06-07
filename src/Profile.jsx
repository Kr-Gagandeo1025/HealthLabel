import React, { useEffect, useState } from 'react'
import NutrientCheckerForm from './components/NutrientCheckerForm'
import Nav from './components/Nav';
import { useAuth } from './contexts/authContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase/firebase';
import Contactus from './components/Contactus';

const Profile = () => {
  const {currentUser} = useAuth();
  const [userExists, setUserExists] = useState(false);
  const getData = async() =>{
    const querySnapshot = await getDocs(collection(db, "healthdata"));
    querySnapshot.forEach((doc) => {
      if(doc.data().email === currentUser.email){
        setUserExists(true)
      };
    });
  }
  useEffect(()=>{
    getData()
  })

  return (
    <div className='flex justify-center items-center'>
        <div className='flex flex-col items-center justify-between sm:w-[50%] w-[100%]'>
        <Nav page="profile"/>
        {currentUser && <h1 className="text-left w-full px-1 font-bold">Hey 👋, {currentUser.displayName}</h1>}
        {
          userExists?
          <div className="flex flex-col justify-between items-center border m-3 p-4 w-[90%] rounded-lg">
            <h1 className='text-xl font-bold'>User Data Already Exists</h1>
            <p className='text-sm text-gray-500'>*re-submitting data will delete previous data as soon as clicked<br/>
              *deleting data will delete all your health data from our servers and logout.
            </p>
            <div className='flex gap-3 my-3'>
              <button className='p-2 border border-black rounded-xl bg-blue-600'>Re-Submit Data</button>
              <button className='p-2 border border-black rounded-xl bg-red-600'>Delete Data</button>
            </div>
          </div>
          :
          <NutrientCheckerForm user={currentUser}/>
        }
        <Contactus/>
        </div>
    </div>
  )
}

export default Profile
