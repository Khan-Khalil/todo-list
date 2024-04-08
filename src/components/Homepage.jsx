import { signOut, onAuthStateChanged } from "firebase/auth"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { auth, db } from "../firebase"
import { onValue, ref, remove, set, update } from "firebase/database"
import { uid } from "uid"
import "./homepage.css"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import CheckIcon from '@mui/icons-material/Check'
import AddIcon from "@mui/icons-material/Add"
import LogoutIcon from '@mui/icons-material/Logout'

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
        <div className="home-page"> 
         <div className="add-todo">
            <input
             type="text"
             value={todo}
             placeholder="Add todo" 
             onChange={handleAddTodo}
            />
            
             {
                isEdit ? ( 
                    <div>
                    <CheckIcon onClick={handleUpdating} className="add-confirm-icon"/>
                    </div>
                ) : (
                    <div>    
                     <AddIcon onClick={writeToDatabase} className="add-confirm-icon" />
                     </div>
                )
             }

        

         </div>
            { todos.map((todo) => (
                <div className="todo">
                    <h1>{todo.todo}</h1>
                    <EditIcon
                        fontSize="large"
                        onClick={() => handleUpdate(todo)}
                        className="edit-button"
                    />
                    <DeleteIcon
                        fontSize="large"
                        onClick={() => handleDelete(todo.uidd)}
                        className="delete-button"
                    />
                    
                </div>
            ))}
                <LogoutIcon onClick={handleSignout} className="logout-icon">Sign out</LogoutIcon>
        </div>
    )
}