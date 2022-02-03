import React, { useState, useEffect } from "react";
import { FaRegCalendarPlus, FaSearch } from "react-icons/fa";
import EventCard from "./EventCard";
import { Link } from "react-router-dom";
import axios from "axios";

function Events()
{
    const [events, setEvents] = useState([]);

    const getData = async () => {
        try
        {   
            axios.get('http://localhost:5000/events/')
                .then(function(res)
                {
                    setEvents(res.data);
                });
        }

        catch(error)
        {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="flex mx-auto p-auto h-view justify-center bg-zinc-900 items-stretch">
            <div className="2xl:mx-auto lg:px-20 lg:py-16 md:py-12 md:px-3 py-9 px-4 w-96 sm:w-auto">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-4xl font-bold leading-9 text-center text-white">All events</h1>
                    <p className="text-base leading-normal text-center text-white mt-4 lg:w-1/2 md:w-10/12 w-11/12">
                        All the events you're looking for are here.
                    </p>

                    <span className="inline-flex items-center justify-center m-2 px-2 py-1 text-lg font-bold leading-none text-white bg-red-500 rounded-full">
                        🔥 #dancing
                    </span>

                    
                    <Link to="/events/add" className="text-xl px-2 py-4 flex items-center leading-snug m-5 bg-white text-black font-bold border-black hover:border-black rounded hover:bg-green-600 hover:text-white">
                        <FaRegCalendarPlus fontSize={21} className="text-xl leading-lg"/>
                            Create
                    </Link>
                </div>

                <div className="flex items-center max-w-md mx-auto bg-white rounded-lg">
                    <div className="w-full">
                        <input type="search" className="w-full px-4 py-1 text-gray-800 rounded focus:outline-none" placeholder="Search for events" />
                    </div>

                    <button type="submit" className="flex items-center bg-blue-500 justify-center w-12 h-12 text-white rounded-r" >
                        <FaSearch className="text-xl leading-lg"/>
                    </button>  
                </div>

                <div className="container mx-auto">
                    <div className="lg:flex md:flex flex-wrap sm:flex items-center xl:justify-between flex-wrap md:justify-around sm:justify-around lg:justify-around">
                        {
                            events.map(event =>
                                <EventCard key={event._id.toString()} title={event.title} desc={event.description} date={event.date} time={event.time} createdAt={event.createdAt} place={event.place}/>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Events;