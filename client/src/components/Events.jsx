import React, { useState, useEffect } from "react";
import { FaRegCalendarPlus, FaSearch } from "react-icons/fa";
import Spinner from "./Spinner";
import EventCard from "./EventCard";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

function Events()
{
    const [events, setEvents] = useState([]);
    const [filter, setFilter] = useState("");
    const [loading, setLoading] = useState(false);
    const [trending, setTrending] = useState("");

    const getData = async () => {
        setLoading(true);
        try
        {
            const jmtoken = localStorage.jmtoken;
            axios.get(process.env.REACT_APP_BACKEND_ADDRESS + '/events/', { params: {filter: filter}, headers: {'jmtoken': `${jmtoken}` } })
                .then(function(res)
                {
                    if(res.data.length)
                    {
                        setEvents(res.data);
                    }

                    setLoading(false);
                });

            axios.get(process.env.REACT_APP_BACKEND_ADDRESS + '/analytics/hot', {headers: {'jmtoken': `${jmtoken}` }})
                .then(function(res)
                {
                   if(res.data?.length)
                   {
                       setTrending(res.data);
                   }
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
        <div className="mb-auto bg-zinc-900">
        <div className="flex mx-auto p-auto h-view justify-center bg-zinc-900 items-stretch">
            <div className="2xl:mx-auto lg:px-20 lg:py-16 md:py-12 md:px-3 py-9 px-4 w-96 sm:w-auto">
                <div className="flex flex-col items-center justify-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                        <h1 className="text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-blue-600 font-extrabold sm:text-4xl md:text-5xl lg:text-6xl text-4xl duration-300">All events</h1>
                    </motion.div>
                    <p className="text-xl leading-normal text-center text-white mt-4 lg:w-1/2 md:w-10/12 w-11/12 duration-300">
                        All the events you're looking for are here.
                    </p>

                    {
                        trending ? (
                            <span title="Trending interest of the week" className="inline-flex items-center justify-center m-2 px-2 py-1 text-lg font-bold leading-none text-white bg-red-500 rounded-full duration-300">
                                🔥 #{trending}
                            </span>
                        ) : (
                            <div></div>
                        )
                    }


                    
                    <Link title="Click here to create event" to="/events/add"
                          className="text-xl px-2 py-4 flex items-center leading-snug m-5 bg-white text-black font-bold border-black hover:border-black rounded hover:bg-green-600 hover:text-white duration-300">
                        <FaRegCalendarPlus fontSize={21} className="text-xl mr-1 leading-lg"/>
                            Create
                    </Link>
                </div>

                <div className="flex items-center max-w-md mx-auto bg-white rounded-lg duration-300 transform">
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
                            <div className="lg:flex md:flex sm:flex items-center xl:justify-center flex-wrap md:justify-center sm:justify-center lg:justify-center duration-300">
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