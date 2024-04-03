import { signOut, onAuthStateChanged } from "firebase/auth"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { auth, db } from "../firebase"
import { onValue, ref, remove, set, update } from "firebase/database"
import { uid } from "uid"

export default function Homepage() {
    const navigate = useNavigate()
    const [todo, setTodo] = useState("")
    const [todos, setTodos] = useState([])
    const [tempUidd, setTempUidd] = useState("")
    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
        auth.onAuthStateChanged((user) => {

            // read or showing all the the todos
            if(user) {
                onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
                    setTodos([])
                    const data = snapshot.val()
                    if(data !== null) {
                        Object.values(data).map((todo) => {
                            setTodos((oldArray) => [...oldArray, todo])
                        })
                    }
                })
            } else if(!user){
                navigate('/')
            }
        })
    },[])

    const handleAddTodo = (e) => {
        setTodo(e.target.value)
    }

    //    adding todo
    const writeToDatabase = () => {
        const uidd = uid()
        set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
            todo: todo,
            uidd: uidd
        })
        setTodo("")
    }

    const handleDelete = (uidd) => {
        remove(ref(db,`/${auth.currentUser.uid}/${uidd}`))
    } 

    const handleUpdate = (todo) => {
        setIsEdit(true)
        setTodo(todo.todo)
        setTempUidd(todo.uidd)
    }

    const handleUpdating = () => {
        update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`), {
            todo: todo,
            tempUidd: tempUidd
        })
        setTodo("")
        setIsEdit(false)
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
            { todos.map((todo) => (
                <div>
                    <h1>{todo.todo}</h1>
                    <button onClick={() => handleUpdate(todo)}>update</button>
                    <button onClick={() => handleDelete(todo.uidd)}>delete</button>
                </div>
            ))}
            {
                isEdit ? ( <button onClick={handleUpdating}>Confirm</button> 
                ) : (

                    <button onClick={writeToDatabase}>add</button>
                )
            }
                <button onClick={handleSignout}>Sign out</button>
        </div>
    )
}