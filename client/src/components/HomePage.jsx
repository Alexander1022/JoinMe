import React, {Component, useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import NoProfilePic from "../assets/no_pfp.png";
import Spinner from "./Spinner";

function HomePage({ isAuthenticated })
{
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const [potentialUsers, setPotentialUsers] = useState([]);
    const [potentialEvents, setPotentialEvents] = useState([]);

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
                    }
                });

            axios.get(process.env.REACT_APP_BACKEND_ADDRESS + '/analytics/events', {headers: {'jmtoken': `${jmtoken}` }})
                .then(function(res){
                   if(res.data.length)
                   {
                       setPotentialEvents(res.data);
                   }
                });
        }

        catch(error)
        {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    if(isAuthenticated) return (
        <div className="my-auto bg-zinc-900 h-screen">
            <div className="flex flex-col mt-auto pt-10 pb-0 h-view justify-center items-center bg-zinc-900">
                <h1 className="text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-blue-600 font-extrabold sm:text-4xl md:text-5xl lg:text-6xl text-4xl duration-300">Related to you</h1>
                <div className="pt-20 pb-5">
                    { potentialUsers.length ? (
                        <div
                            className="w-screen max-w-2xl mx-auto bg-white rounded-xl shadow-xl py-10 px-10 duration-300 flex flex-col">
                            <h1 className="pb-5 text-black text-4xl">Friends we recommend</h1>
                            {
                                potentialUsers.map(potentialUser =>
                                    <div
                                        key={potentialUser[0].user_id}
                                        className="flex flex-col items-center justify-between p-4 duration-300 sm:flex-row sm:py-4 sm:px-5 md:flex-row md:py-4 md:px-5 lg:py-10 lg:px-15 hover:bg-gray-200 rounded-xl shadow-2xl duration-300">
                                        <div
                                            className="flex items-center text-center flex-col sm:flex-row sm:text-left duration-300">
                                            <div className="mb-2.5 sm:mb-0 sm:mr-2.5 duration-300">
                                                {
                                                    potentialUser[0].picture.length > 1 ? (
                                                        <img className="w-20 h-20 rounded-full duration-300"
                                                             src={potentialUser[0].picture}
                                                             referrerPolicy="no-referrer"
                                                        />
                                                    ) : (
                                                        <img className="w-20 h-20 rounded-full duration-300"
                                                             src={NoProfilePic}/>
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
                                                className="inline-block select-none no-underline align-middle cursor-pointer whitespace-nowrap px-4 py-1.5 rounded text-base font-medium leading-6 tracking-tight text-white text-center border-0 bg-indigo-700 hover:bg-indigo-900 duration-300"
                                            >
                                                See Profile
                                            </Link>
                                        </div>
                                    </div>
                                )}
                        </div>) : (<div></div>)
                    }

                    {potentialEvents.length ? (
                    <div className="w-screen max-w-2xl mx-auto bg-white rounded-xl shadow-xl py-5 px-10 duration-300 flex flex-col my-10">
                        <h1 className="pb-5 text-black text-4xl">Events your friends like or made</h1>
                        {
                            potentialEvents.map(potentialEvent =>
                                <div key={potentialEvent[0]._id} className="bg-gray-50 shadow-2xl rounded-lg mb-6 sm:py-4 sm:px-5 md:flex-row md:py-4 md:px-5 lg:py-5 lg:px-15 hover:bg-gray-200 duration-300">
                                        <div className="md:flex-shrink-0">

                                            <img
                                                src={potentialEvent[0].coverUrl}
                                                alt={potentialEvent[0].title}
                                                className="object-cover h-full w-full rounded-lg rounded-b-none"
                                            />

                                        </div>

                                        <div className="py-1">
                                            <div className="p-4">
                                                <h2 className="truncate font-bold mb-2 md:mt-4 text-2xl text-gray-800 tracking-normal">
                                                    {potentialEvent[0].title}
                                                </h2>

                                        </div>

                                            <div className="flex items-center justify-between p-2 md:p-4 md:mx-4">
                                                <div className="flex items-center">
                                                    <div className="text-sm ml-2">
                                                        <p className="text-black leading-none">{potentialEvent[0].time}</p>
                                                        <p className="text-gray-700">{new Date(potentialEvent[0].date).toLocaleDateString("en-US", dateOptions).replace(/,/g, '')}</p>
                                                    </div>
                                                </div>
                                            <Link
                                                to={"/events/id/" + potentialEvent[0]._id}
                                                className="inline-block select-none no-underline align-middle cursor-pointer whitespace-nowrap px-4 py-1.5 rounded text-base font-medium leading-6 tracking-tight text-white text-center border-0 bg-indigo-700 hover:bg-indigo-900 duration-300">
                                                    Read More
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                    </div>) : (<div></div>)
                    }
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