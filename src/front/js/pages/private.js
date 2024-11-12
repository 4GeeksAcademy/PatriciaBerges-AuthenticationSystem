import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()

    const handleLogOut = () => {
        localStorage.removeItem('jwt-token')
        navigate("/")
    }

    return (
        <div className="container formularyBox" >
            <h3 className="private">Welcome! This should only be accessible if you are logged in</h3>
            <button className="btn btn-primary" onClick={handleLogOut}>
                Log out
            </button>
        </div>
    )
}