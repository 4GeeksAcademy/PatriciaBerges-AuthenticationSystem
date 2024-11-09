import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
    const { store, actions } = useContext(Context);

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogIn = (email, password) => {
        console.log(email, password)
        if(email && password){
            actions.login(email, password)
        }
    }

    return (
        <div className="container formularyBox d-flex flex-column" >
            <h3>Log In</h3>
            <div className="d-flex flex-column inputBox">
                <label htmlFor="email">Enter email</label>
                <input type="text" id="email" name="email" className="formularyInput form-control" onChange={(e) => setEmail(e.target.value)}></input>
            </div>
            <div className="d-flex flex-column inputBox">
                <label htmlFor="password">Enter password</label>
                <input type="password" id="password" name="password" className="formularyInput form-control" onChange={(e) => setPassword(e.target.value)}></input>
             </div>
             <button className="btn btn-primary button" onClick={() => handleLogIn(email, password)}>
                Log In
             </button>
             <Link to="/signup" className="link">
                New? Sign up here
             </Link>
        </div>
    )
}