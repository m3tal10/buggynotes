import React,{useState,useEffect} from 'react'
import { AuthContext } from './AuthContext'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../firebase'
function AuthContextProvider({children}) {
    const [authUser,setAuthUser]=useState(null)
    useEffect(()=>{
        const listen= onAuthStateChanged(auth,(user)=>{
            if(user){
                setAuthUser(user)
            }
            else setAuthUser(null)
        })
        return ()=>{listen()}
    },[])
    
  return (
    <AuthContext.Provider value={{authUser,setAuthUser}}>{children}</AuthContext.Provider>
  )
}

export default AuthContextProvider