import React,{useContext} from "react";
import {auth } from "../../firebase";
import {signOut } from "firebase/auth";
import { AuthContext } from "../../Context/AuthContext";

const AuthDetails=()=>{
    const {authUser}=useContext(AuthContext)
    const userSignOut=()=>{
        signOut(auth)
    }
    return(
        <div className="">{authUser? <><p>{`Signed In as ${authUser.email}`} </p><button onClick={userSignOut}>Sign Out</button></>:<p>"Signed Out" </p>} </div>
    )
}
export default AuthDetails;