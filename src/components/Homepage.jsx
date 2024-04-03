import { signOut, onAuthStateChanged } from "firebase/auth"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { auth, db } from "../firebase"
import { ref, set } from "firebase/database"
import { uid } from "uid"

export default function Homepage() {
    const navigate = useNavigate()
    const [todo, setTodo] = useState("")

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(!user){
                navigate('/')
            }
        })
    },[])

    const handleAddTodo = (e) => {
        setTodo(e.target.value)
    }

    const writeToDatabase = () => {
        const uidd = uid()
        set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
            todo: todo,
            uidd: uidd
        })
        setTodo("")
    }

    const handleSignout = () => {
        signOut(auth).then(() => {
            navigate('/')
        }).catch((err) => {
            alert(err.message)
        })
    }
    return (
        <div>
            <input
             type="text"
             value={todo}
             placeholder="Add todo" 
             onChange={handleAddTodo}
            />
            <button onClick={writeToDatabase}>add</button>
            <button onClick={handleSignout}>Sign out</button>
        </div>
    )
}