import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase.js"
import { useNavigate } from "react-router-dom"

export default function Welcome() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()


    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if(user){
                navigate('/homepage')
            }
        })
    },[])
    
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password).then(() => {
            navigate("/homepage")
        }).catch((err)=> alert(err.message))
    }

    return(
        <div className="login-page">
            <h1>Todo List</h1>
            <div className="login-container">
                <input type="email" onChange={handleEmailChange}/>
                <input type="password" onChange={handlePasswordChange}/>
                <button onClick={handleSignIn}>Sign In</button>
                <a href="">Creat an account</a>
            </div>
        </div>
    )
}