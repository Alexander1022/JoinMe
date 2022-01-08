import React, { Component } from "react";
import { Link } from 'react-router-dom';


function Navbar()
{
    return (
        <nav>
            <Link to="/" >JoinMe</Link>
            <div>
                <ul>

                    <li>
                        <Link to="/users/">Users</Link>
                    </li>

                    <li>
                        <Link to="/users/add">Create User</Link>
                    </li>

                    <li>
                        <Link to="/signin">Log In with Facebook</Link>
                    </li>

                </ul>
            </div>
        </nav>
    )
}

export default Navbar;