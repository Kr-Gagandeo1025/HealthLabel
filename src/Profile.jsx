import React from 'react'
import NutrientCheckerForm from './components/NutrientCheckerForm'
import Nav from './components/Nav';

const Profile = () => {
  return (
    <div className='flex justify-center items-center'>
        <div className='flex flex-col items-center justify-between sm:w-[90%] rounded-lg w-[100%] shadow-lg'>
        <Nav page="profile"/>
        <NutrientCheckerForm/>
        </div>
    </div>
  )
}

export default Profile
