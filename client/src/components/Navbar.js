import React, { Component } from "react";
import { Link, Navigate } from 'react-router-dom';


function Navbar({ isAuthenticated, setIsAuthenticated })
{

    function logout()
    {
        try
        {   
            localStorage.removeItem("jmtoken");
            setIsAuthenticated(false);

            <Navigate to="/" />
        }

        catch(error)
        {
            console.log(error);
        }
    }

    if(isAuthenticated)
    {
        return (
            <nav>
                <Link to="/" >JoinMe</Link>
                
                <div>
                    <Link to="/profile">My Profile</Link>
                </div>

                <div>
                    <button onClick={logout}>
                        Logout
                    </button>
                </div>
            </nav>
        ) 
    }

    else
    {
        return (
            <nav>
                <Link to="/" >JoinMe</Link>
                <div>
                    <Link to="/signIn">Sign In/Sign Up</Link>
                </div>
                
            </nav>
        )  
    }
    
}

export default Navbar;