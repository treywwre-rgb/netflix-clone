import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut} from "firebase/auth"
import { 
    addDoc,
    collection, 
    getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAdklmkUmOId3yJQ01TthjSVLCWDCwOWKA",
  authDomain: "netflix-clone-46901.firebaseapp.com",
  projectId: "netflix-clone-46901",
  storageBucket: "netflix-clone-46901.firebasestorage.app",
  messagingSenderId: "495682678181",
  appId: "1:495682678181:web:2db70d15e2da36a9b08c4c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password )
        const user = res.user;
        await addDoc(collection(db, "user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    }catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password)=>{
    try{
       await signInWithEmailAndPassword(auth, email, password);
    }catch(error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout}