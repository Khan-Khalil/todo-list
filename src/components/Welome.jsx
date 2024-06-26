import React, { useEffect, useState } from "react";
import { 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase.js"
import { useNavigate } from "react-router-dom"
import './welcome.css'
import TodoSVG from '../assets/todo-svg.svg'


export default function Welcome() {
    const [email, setEmail] = useState("")
    const [confirmEmail, setConfirmEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [registering, setRegistering] = useState(false)
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

    const handleConfirmEmailChange = (e) => {
        setConfirmEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value)
    }

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password).then(() => {
            navigate("/homepage")
        }).catch((err)=> alert(err.message))
    }


    const handleRegister = () => {
        if(email !== confirmEmail) {
            alert("Email do not match")
            return
        } else if (password !== confirmPassword) {
            alert("password do not match")
            return
        }
        createUserWithEmailAndPassword(auth, email, password).then(() => {
            navigate("/homepage")
        }).catch((err) => alert(err.message))
    }

    return(
        <div className="login-page">
         <div className="h1-container">
         <h1>Todo List</h1>

            <div className="login-container">
                
                    <input 
                      type="email" 
                      id="email"
                      placeholder="Enter your email" 
                      value={email}
                      onChange={handleEmailChange}
                      /> <br/>
                   { registering && ( 
                       <>

                    <input 
                     type="email" 
                     id="confirm-email"
                     placeholder="Reenter your email" 
                     value={confirmEmail}
                     onChange={handleConfirmEmailChange}
                    /> <br/>
                    </>
                    )} 

                    <input 
                     type="password" 
                     id="password"
                     placeholder="Enter your password" 
                     value={password}
                     onChange={handlePasswordChange}
                     /> <br />

                    {registering && (
                        <>
                    <input 
                    type="password" 
                    id="confirm-password"
                    placeholder="Reenter your password" 
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    /> <br />
                    </>
                    )}
                    <button className="signin-register-button" onClick={registering? handleRegister : handleSignIn}>{registering ? "Register" : "Sign in"}</button>
                    <button className="create-account-button" type="button" onClick={() => setRegistering(!registering)}>{registering ? "Go back" : "create an account"}</button>
                
            </div>
        
         </div> 
         <div className="svg">
         <img src={TodoSVG} className="todo-svg" />
         </div>
        </div>
    )
}