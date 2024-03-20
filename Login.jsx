import React from "react"
import ReactDOM from "react-dom"
import SignIn from "./components/Auth/signIn"
import SignUp from "./components/Auth/signUp"
function Login(){
    return(
        <>
        <SignIn/>
        <SignUp/>
        </>
    )
}

ReactDOM.render(<Login />, document.getElementById("root"))
