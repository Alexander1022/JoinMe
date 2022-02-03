import React, { Component } from "react";
import { Link, Navigate } from 'react-router-dom';
import { FaUserAlt, FaBars, FaSignInAlt, FaSignOutAlt, FaTree, FaUsers } from "react-icons/fa";

function Navbar({ isAuthenticated, setIsAuthenticated })
{
    const [navbarOpen, setNavbarOpen] = React.useState(false);

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
            <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-zinc-800 mb-0">
                <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                    <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                        <Link to="/" className="text-xl leading-relaxed inline-block mr-4 py-2 whitespace-nowrap text-white hover:text-stone-300">JoinMe</Link>
                        <button
                            className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                            type="button"
                            onClick={() => setNavbarOpen(!navbarOpen)}
                        >
                        <FaBars />
                        </button>
                    </div>

                    
                    <div className={"lg:flex flex-grow items-center" + (navbarOpen ? " flex" : " hidden") } id="example-navbar-danger">
                        <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                            <li className="nav-item">
                                <Link to="/" className="text-xl px-3 py-2 flex items-center leading-snug text-white hover:text-stone-300">
                                    <FaUsers fontSize={21} className="text-3xl leading-lg"/>
                                    People
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/events" className="text-xl px-3 py-2 flex items-center leading-snug text-white hover:text-stone-300">
                                    <FaTree fontSize={21} className="text-2xl leading-lg"/>
                                    Events
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/profile" className="text-xl px-3 py-2 flex items-center leading-snug text-white hover:text-stone-300">
                                    <FaUserAlt fontSize={21} className="text-xl leading-lg"/>
                                    My Profile
                                </Link>
                            </li>

                            <li className="nav-item">
                                <button onClick={logout} className="text-xl px-3 py-2 flex items-center leading-snug text-white hover:text-stone-300">
                                    <FaSignOutAlt fontSize={21} className="text-lg leading-lg"/>
                                    Logout
                                </button>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        ) 
    }

    else
    {
        return (
            <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-zinc-800 mb-0">
                <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                    <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                        <Link to="/" className="text-xl leading-relaxed inline-block mr-4 py-2 whitespace-nowrap text-white hover:text-stone-300">JoinMe</Link>
                        <button
                            className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                            type="button"
                            onClick={() => setNavbarOpen(!navbarOpen)}
                        >
                        <FaBars />
                        </button>
                    </div>

                    <div className={"lg:flex flex-grow items-center" + (navbarOpen ? " flex" : " hidden") } id="example-navbar-danger">
                        <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                            <li className="nav-item">
                                <Link to="/signIn" className="text-xl px-3 py-2 flex items-center leading-snug text-white hover:text-stone-300">
                                    <FaSignInAlt fontSize={21} className="text-2xl leading-lg"/>
                                    Log In
                                </Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>

            
        )  
    }
    
}

export default Navbar;