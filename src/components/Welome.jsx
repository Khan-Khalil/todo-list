import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase.js"
import { useNavigate } from "react-router-dom"

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
         <h1>Todo List</h1>
         <form>
            <div className="login-container">
              {  registering ?
                ( <>
                    <label htmlFor="email">Email</label>
                    <input 
                      type="email" 
                      id="email"
                      placeholder="Enter your email" 
                      value={email}
                      onChange={handleEmailChange}
                    /> <br/>
                    <label htmlFor="confirm-email">Confirm Email</label>
                    <input 
                     type="email" 
                     id="confirm-email"
                     placeholder="Reenter your email" 
                     value={confirmEmail}
                     onChange={handleConfirmEmailChange}
                    /> <br/>
                    <label htmlFor="password">Password</label>
                    <input 
                     type="password" 
                     id="password"
                     placeholder="Enter your password" 
                     value={password}
                     onChange={handlePasswordChange}
                    /> <br />
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input 
                     type="password" 
                     id="confirm-password"
                     placeholder="Reenter your password" 
                     value={confirmPassword}
                     onChange={handleConfirmPasswordChange}
                    /> <br />
                    <button onClick={handleRegister}>Register</button>
                    <button onClick={() => setRegistering(false)}>Go back</button>
                 </>
                ) : (
                 <>
                    <label htmlFor="email">Email</label>
                    <input 
                      type="email" 
                      id="email"
                      placeholder="Enter your email" 
                      value={email}
                      onChange={handleEmailChange}
                    /> <br/>
                    <label htmlFor="password">Password</label>
                    <input 
                     type="password" 
                     id="password"
                     placeholder="Enter your password" 
                     value={password}
                     onChange={handlePasswordChange}
                    /> <br />
                    <button onClick={handleSignIn}>Sign In</button>
                    <button onClick={() => setRegistering(true)}>Creat an account</button>
                 </>
                )}
                
            </div>
         </form> 
        </div>
    )
}