import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Private = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container formularyBox" >
            <h3 className="private">Welcome! This should only be accessible if you are logged in</h3>
            <Link to="/" className="link">
                Log out
            </Link>
        </div>
    )
}