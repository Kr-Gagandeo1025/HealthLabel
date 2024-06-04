import { signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";
import { GoogleAuthProvider } from "firebase/auth";


export const doSignInwithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result
};

export const doSingOut = () =>{
    return auth.signOut();
}