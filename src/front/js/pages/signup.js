import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, Navigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSignUp = async (email, password) => {
        if(email && password){
            try
            {await actions.signup(email, password)
            navigate("/")}
            catch (e) {
                setError(e.message)
            }          
        }
    }
    

    return (
        <div className="container formularyBox d-flex flex-column" >
            <h3>Sign Up</h3>
            <div className="d-flex flex-column inputBox">
                <label htmlFor="email">Enter email</label>
                <input type="text" id="email" name="email" className="formularyInput form-control" onChange={(e) => setEmail(e.target.value)}></input>
            </div>
            <div className="d-flex flex-column inputBox">
                <label htmlFor="password">Enter password</label>
                <input type="password" id="password" name="password" className="formularyInput form-control" onChange={(e) => setPassword(e.target.value)}></input>
             </div>
             <button className="btn btn-primary button" onClick={() => handleSignUp(email, password)}>
                Sign Up
             </button>
             <Link to="/" className="link">
                Already signed up? Log in here
             </Link>
             {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
    )
}