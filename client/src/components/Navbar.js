import React, { Component } from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

class Navbar extends Component
{
    render()
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

                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navbar;