import React, { useState } from 'react';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const NutrientCheckerForm = () => {
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
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    height: '',
    weight: '',
    healthConditions: [],
    nutrientConcerns: [],
    allergies:[]
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData((prevFormData) => {
        if (name === 'healthConditions' || name === 'nutrientConcerns' || name === 'allergies') {
          const newValues = checked
            ? [...prevFormData[name], value]
            : prevFormData[name].filter((v) => v !== value);
          return { ...prevFormData, [name]: newValues };
        }
        return prevFormData;
      });
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.age === "" || formData.gender === "" || formData.height === "" || formData.weight === ""){
        toast.error('Please fill * marked fields!', toastData)
    }else{
        console.log('Form Data:', formData);
    }

    // You can add code here to handle the form submission
  };

  return (
    <div className="sm:w-[80%] w-full mx-auto p-4">
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
      <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Age*:</label>
          <input 
            type="number" 
            name="age" 
            value={formData.age} 
            onChange={handleChange} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Gender*:</label>
          <select 
            name="gender" 
            value={formData.gender} 
            onChange={handleChange} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Height (cm)*:</label>
          <input 
            type="number" 
            name="height" 
            value={formData.height} 
            onChange={handleChange} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Weight (kg)*:</label>
          <input 
            type="number" 
            name="weight" 
            value={formData.weight} 
            onChange={handleChange} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <h2 className="text-xl font-semibold mb-4">Health Conditions</h2>

        <div className="mb-2">
          <label className="block text-gray-700">
            <input
              type="checkbox"
              name="healthConditions"
              value="diabetes"
              checked={formData.healthConditions.includes('diabetes')}
              onChange={handleChange}
              className="mr-2"
            />
            Diabetes
          </label>
        </div>

        <div className="mb-2">
          <label className="block text-gray-700">
            <input
              type="checkbox"
              name="healthConditions"
              value="hypertension"
              checked={formData.healthConditions.includes('hypertension')}
              onChange={handleChange}
              className="mr-2"
            />
            Hypertension
          </label>
        </div>

        <div className="mb-2">
          <label className="block text-gray-700">
            <input
              type="checkbox"
              name="healthConditions"
              value="cholesterol"
              checked={formData.healthConditions.includes('cholesterol')}
              onChange={handleChange}
              className="mr-2"
            />
            Cholesterol Issues
          </label>
        </div>

        <div className="mb-2">
          <label className="block text-gray-700">
            <input
              type="checkbox"
              name="healthConditions"
              value="kidneyDisease"
              checked={formData.healthConditions.includes('kidneyDisease')}
              onChange={handleChange}
              className="mr-2"
            />
            Kidney Disease
          </label>
        </div>

        <h2 className="text-xl font-semibold mb-4">Specific Nutrient Concerns</h2>

        <div className="mb-2">
          <label className="block text-gray-700">
            <input
              type="checkbox"
              name="nutrientConcerns"
              value="sodium"
              checked={formData.nutrientConcerns.includes('sodium')}
              onChange={handleChange}
              className="mr-2"
            />
            Sodium Sensitivity
          </label>
        </div>

        <div className="mb-2">
          <label className="block text-gray-700">
            <input
              type="checkbox"
              name="nutrientConcerns"
              value="sugar"
              checked={formData.nutrientConcerns.includes('sugar')}
              onChange={handleChange}
              className="mr-2"
            />
            Sugar Sensitivity
          </label>
        </div>

        <div className="mb-2">
          <label className="block text-gray-700">
            <input
              type="checkbox"
              name="nutrientConcerns"
              value="fat"
              checked={formData.nutrientConcerns.includes('fat')}
              onChange={handleChange}
              className="mr-2"
            />
            Fat Sensitivity
          </label>
        </div>

        <div className="mb-2">
          <label className="block text-gray-700">
            <input
              type="checkbox"
              name="nutrientConcerns"
              value="protein"
              checked={formData.nutrientConcerns.includes('protein')}
              onChange={handleChange}
              className="mr-2"
            />
            Protein Intake
          </label>
        </div>
        <h2 className="text-xl font-semibold mb-4">Specific Allergies</h2>

        <div className="mb-2">
          <label className="block text-gray-700">
            <input
              type="checkbox"
              name="allergies"
              value="peanuts"
              checked={formData.allergies.includes('peanuts')}
              onChange={handleChange}
              className="mr-2"
            />
            Peanuts
          </label>
        </div>

        <div className="mb-2">
          <label className="block text-gray-700">
            <input
              type="checkbox"
              name="allergies"
              value="gluten"
              checked={formData.allergies.includes('gluten')}
              onChange={handleChange}
              className="mr-2"
            />
            Gluten
          </label>
        </div>

        <div className="mb-2">
          <label className="block text-gray-700">
            <input
              type="checkbox"
              name="allergies"
              value="dairy"
              checked={formData.allergies.includes('dairy')}
              onChange={handleChange}
              className="mr-2"
            />
            Dairy
          </label>
        </div>

        <div className="mb-2">
          <label className="block text-gray-700">
            <input
              type="checkbox"
              name="allergies"
              value="soy"
              checked={formData.allergies.includes('soy')}
              onChange={handleChange}
              className="mr-2"
            />
            Soy
          </label>
        </div>


        <div className='flex flex-col justify-between items-center w-full'>
            <button
            type="submit"
            className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 w-full"
            >
            Submit
            </button>
        </div>
      </form>
    </div>
  );
};

export default NutrientCheckerForm;
