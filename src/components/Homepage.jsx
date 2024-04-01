import { signOut, onAuthStateChanged } from "firebase/auth"
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { auth } from "../firebase"

export default function Homepage() {
    const navigate = useNavigate()

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(!user){
                navigate('/')
            }
        })
    },[])

    const handleSignout = () => {
        signOut(auth).then(() => {
            navigate('/')
        }).catch((err) => {
            alert(err.message)
        })
    }
    return (
        <div>
            <h1>homepage</h1>
            <button onClick={handleSignout}>Sign out</button>
        </div>
    )
}