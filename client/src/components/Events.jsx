import React, { useState, useEffect } from "react";
import { FaRegCalendarPlus, FaSearch } from "react-icons/fa";
import Spinner from "./Spinner";
import EventCard from "./EventCard";
import { Link } from "react-router-dom";
import axios from "axios";

function Events()
{
    const [events, setEvents] = useState([]);
    const [filter, setFilter] = useState("");
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        setLoading(true);
        try
        {
            const jmtoken = localStorage.jmtoken;
            axios.get('http://localhost:5000/events/', { params: {filter: filter}, headers: {'jmtoken': `${jmtoken}` } })
                .then(function(res)
                {
                    if(res.data.length)
                    {
                        setEvents(res.data);
                    }

                    setLoading(false);
                });
        }

        catch(error)
        {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getData();
    }, [filter]);

    return (
        <div className="mb-auto">
        <div className="flex mx-auto p-auto h-view justify-center bg-zinc-900 items-stretch">
            <div className="2xl:mx-auto lg:px-20 lg:py-16 md:py-12 md:px-3 py-9 px-4 w-96 sm:w-auto">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-4xl font-bold leading-9 text-center text-white">All Events</h1>
                    <p className="text-base leading-normal text-center text-white mt-4 lg:w-1/2 md:w-10/12 w-11/12">
                        All the events you're looking for are here.
                    </p>

                    <span className="inline-flex items-center justify-center m-2 px-2 py-1 text-lg font-bold leading-none text-white bg-red-500 rounded-full">
                        🔥 #dancing
                    </span>

                    
                    <Link to="/events/add" className="text-xl px-2 py-4 flex items-center leading-snug m-5 bg-white text-black font-bold border-black hover:border-black rounded hover:bg-green-600 hover:text-white">
                        <FaRegCalendarPlus fontSize={21} className="text-xl mr-1 leading-lg"/>
                            Create
                    </Link>
                </div>

                <div className="flex items-center max-w-md mx-auto bg-white rounded-lg">
                    <div className="w-full">
                        <input 
                            type="search" 
                            className="w-full px-4 py-1 h-12 text-gray-800 rounded focus:outline-none" 
                            placeholder="Search for events" 
                            onChange={event => setFilter(event.target.value)}
                            />
                    </div> 
                </div>

                {
                    loading ? (<Spinner message="Loading events" />):
                    (
                        <div className="container mx-auto my-auto">
                            <div className="lg:flex md:flex sm:flex items-center xl:justify-center flex-wrap md:justify-center sm:justify-center lg:justify-center">
                            {
                                events.map(event =>
                                    <EventCard key={event._id.toString()} cover={event.coverUrl} eventId={event._id.toString()} title={event.title} desc={event.description} date={event.date} time={event.time} createdAt={event.createdAt} place={event.place} tags={event.tags}/>
                                )
                            }
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
        </div>
    );
}

export default Events;