import React from "react";


export default function Welcome() {
    return(
        <div className="login-page">
            <h1>Todo List</h1>
            <div className="login-container">
                <input type="email" />
                <input type="password" />
                <button>Sign In</button>
                <a href="">Creat an account</a>
            </div>
        </div>
    )
}