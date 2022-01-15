import React, { Component } from "react";
import { Link } from 'react-router-dom';


function Navbar()
{
    return (
        <nav>
            <Link to="/" >JoinMe</Link>
            <div>
                <Link to="/signIn">Sign In/Sign Up</Link>
            </div>
            
            <div>
                <Link to="/profile">My Profile</Link>
            </div>
        </nav>
    )
}

export default Navbar;