import React, {Component, useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import NoProfilePic from "../assets/no_cover_event.png";

function HomePage({ isAuthenticated })
{
    const [potentialUsers, setPotentialUsers] = useState([]);

    const getData = async() => {
        const jmtoken = localStorage.jmtoken;

        try
        {
            axios.get(process.env.REACT_APP_BACKEND_ADDRESS + '/analytics/friends', {headers: {'jmtoken': `${jmtoken}` }})
                .then(function(res)
                {
                    if(res.data.length)
                    {
                        setPotentialUsers(res.data);
                        console.log(res.data);
                    }
                });
        }

        catch(error)
        {
            console.log(error.message);
        }
    }

    const truncate = (str, max, len) => {
        return str.length > max ? str.substring(0, len) + "..." : str;
    }

    useEffect(() => {
        getData();
    }, []);

    if(isAuthenticated) return (
        <div className="my-auto bg-zinc-900 h-screen">
            <div className="flex flex-col mt-auto pt-10 pb-0 h-view justify-center items-center bg-zinc-900">
                <h1 className="text-white sm:text-4xl md:text-5xl lg:text-6xl text-4xl duration-300">Related to you</h1>
                <div className="flex pt-20 pb-5">
                    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-xl py-10 px-10 duration-300 flex flex-col">
                        {
                            potentialUsers.map(potentialUser =>
                            <div key={potentialUser[0].user_id}
                                 className="flex flex-col items-center justify-between p-4 duration-300 sm:flex-row sm:py-4 sm:px-5 md:flex-row md:py-4 md:px-5 lg:py-10 lg:px-15 hover:bg-gray-200 rounded-xl shadow-xl duration-300">
                                <div className="flex items-center text-center flex-col sm:flex-row sm:text-left duration-300">
                                    <div className="mb-2.5 sm:mb-0 sm:mr-2.5 duration-300">
                                        {
                                            potentialUser[0].picture.length > 1 ? (
                                                <img className="w-20 h-20 rounded-full duration-300" src={potentialUser[0].picture} />
                                            ) : (
                                                <img className="w-20 h-20 rounded-full duration-300" src={NoProfilePic} />
                                            )
                                        }

                                    </div>

                                    <div className="flex flex-col mb-4 sm:mb-0 sm:mr-4 duration-300">
                                        <h1 className="text-2xl">{potentialUser[0].full_name}</h1>
                                        <div className="flex flex-col">
                                            <h1 className="text-xl text-slate-500">{potentialUser[0].gender}</h1>
                                            <h1 className="text-xl text-slate-500">{potentialUser[0].friendscount} friends</h1>
                                        </div>
                                    </div>
                                </div>

                                <div className="user-option mx-auto sm:ml-auto sm:mr-0">
                                    <Link
                                        to={"/users/id/" + potentialUser[0].user_id}
                                        className="btn inline-block select-none no-underline align-middle cursor-pointer whitespace-nowrap px-4 py-1.5 rounded text-base font-medium leading-6 tracking-tight text-white text-center border-0 bg-indigo-700 hover:bg-indigo-900 duration-300"
                                        >
                                        See profile
                                    </Link>
                            </div>
                        </div>
                            )}
                    </div>
                </div>
            </div>
        </div>
    );

    else return (
            <div className="flex pb-0 h-screen justify-center items-center duration-300 bg-gradient-to-b from-indigo-500 via-rose-500 to-violet-300 flex-col text-center">
                <h1 className="text-white font-bold animate-bounce text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl duration-300">Make friends and join events together!</h1>
                <Link to="/signin" className="text-white rounded-xl p-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold my-10 hover:text-black duration-300">Join now</Link>
            </div>
        );
}

export default HomePage;