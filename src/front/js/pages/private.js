import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()

    const [error, setError] = useState("")
    const [authorized, setAuthorized] = useState(false)

    useEffect(() => {
        const allowAccess = async () => {
            try {
                await actions.privatePage();
                setAuthorized(true)
            }
            catch (e) {
                setError("You must be logged in to access this page")
                navigate("/")
            }
        };
        allowAccess()
    }, [actions, navigate])

    const handleLogOut = () => {
        localStorage.removeItem('jwt-token')
        navigate("/")
    }

    if (authorized === false) {return <p>{error}</p>};

    return (
        <div className="container formularyBox" >
            <h3 className="private">Welcome! This should only be accessible if you are logged in</h3>
            <button className="btn btn-primary" onClick={handleLogOut}>
                Log out
            </button>
        </div>
    )
}