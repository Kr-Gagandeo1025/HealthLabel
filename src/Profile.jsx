import React, { useEffect, useState } from 'react'
import NutrientCheckerForm from './components/NutrientCheckerForm'
import Nav from './components/Nav';
import { useAuth } from './contexts/authContext';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from './firebase/firebase';
import Contactus from './components/Contactus';
import { Slide, ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { doSingOut } from './firebase/auth';

const Profile = () => {
  const navigate = useNavigate();
  const toastData = {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Slide,
    } 
  const {currentUser} = useAuth();
  const [userExists, setUserExists] = useState(null);
  const getData = async() =>{
    const querySnapshot = await getDocs(collection(db, "healthdata"));
    querySnapshot.forEach((doc) => {
      if(doc.data().email === currentUser.email){
        setUserExists(doc.id)
      };
    });
  }
  useEffect(()=>{
    getData()
  })

  const handleDataDelete = async () => {
    try{
      const userDoc = doc(db,"healthdata",userExists);
      await deleteDoc(userDoc);
      setTimeout(()=>{
        doSingOut();
      },[1500])
      navigate('/');
      
    }catch(err){
      toast.error("Cannot Delete Data...",toastData);
    }
  }

  const handleDataUpdate = async () => {
    try{
      const userDoc = doc(db,"healthdata",userExists);
      await deleteDoc(userDoc);
      setUserExists(null);
    }catch(err){
      toast.error("Cannot Update Data...",toastData);
    }
  }

  return (
    <div className='flex justify-center items-center'>
      <ToastContainer
            position="top-center"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Slide}
        />
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
              <button className='p-2 border border-black rounded-xl bg-blue-600' onClick={handleDataUpdate}>Re-Submit Data</button>
              <button className='p-2 border border-black rounded-xl bg-red-600' onClick={handleDataDelete}>Delete Data</button>
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