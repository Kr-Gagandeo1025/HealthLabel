import React from 'react'
// import Webcam from "react-webcam";
import Camera, { FACING_MODES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { BiUpload } from 'react-icons/bi';
import { MdFlipCameraIos } from 'react-icons/md';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UpImage = ({takenimg,setTakenImg}) => {
    // const [takenimg,setTakenImg] = React.useState(null);
    const [cameraPos, setCameraPos] = React.useState(FACING_MODES.USER)
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
    const handleTakePhoto = (dataUri) => {
        // Do stuff with the photo...
        toast.success('Label picture captured !', toastData);
        setTakenImg(dataUri);
    }
    const handleCameraFlip = () => {
        try{
            if (cameraPos === FACING_MODES.USER){
                setCameraPos(FACING_MODES.ENVIRONMENT)
            }else{
                setCameraPos(FACING_MODES.USER)
            }
            toast.info('Camera switched !', toastData);
            
        }catch(err){
            toast.info('Camera cannot be switched !', toastData);
        }
    }
    const handleUpload = () =>{
        toast.error('Upload option comming soon !', toastData);
    }
  return (
    <div className="p-2">
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
            <Camera imageType='png' idealResolution={{width:800,height:720}} idealFacingMode = {cameraPos} isImageMirror = {false}
            onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
            />
        <div className="flex justify-between items-center">
            {takenimg && <img src={takenimg} alt="label" className="h-[100px] p-2 rounded-2xl"/>}
            <div className='flex gap-2 justify-between items-center'>
                <button onClick={handleUpload}><BiUpload className='sm:text-5xl text-3xl'/></button>
                <button onClick={handleCameraFlip}><MdFlipCameraIos className='sm:text-5xl text-3xl'/></button>
            </div>
        </div>
        <p className="text-[11px] opacity-65">*this image will be used for analysis you can retake if image is not clear</p>
    </div>
  )
}

export default UpImage
