import React from "react";
import { Link } from "react-router-dom";
import EventDetails from "./EventDetails";
import Spinner from "./Spinner";

const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

function EventCard({ title, desc, date, time, place, createdAt, eventId, cover })
{
    date = new Date(date);
    date = date.toLocaleDateString("en-US", dateOptions);

    if (!title || !desc || !date || !time || !place || !createdAt) return <Spinner message="Loading event" />;
    
    return (
    
    <div className="xl:w-1/3 xl:mx-5 sm:w-3/4 md:w-2/5 mx-2 relative mt-16 mb-32 sm:mb-24 xl:max-w-1/2 lg:w-2/5">
        <div>
            <img src={cover} className="rounded-t-3xl w-full object-cover h-40" />
        </div>
        
        <div className="bg-white rounded-b-3xl">
            <div className="p-4">
                <div className="inline-block items-center">
                    <h2 className="text-3xl font-bold">{title}</h2>
                    <p className="text-md text-black pt-1">{date}</p>
                </div>

                <p className="text-md py-3 text-clip text-black mt-2 truncate">{desc}</p>
            
                <div className="flex mt-4">
                    <div>
                        <p className="inline-block hover:bg-gray-400 hover:text-black bg-gray-300 rounded-3xl px-3 py-1 text-md text-gray-800 mr-2 mb-2">tag 1</p>
                    </div>

                    <div className="pl-2">
                        <p className="inline-block hover:bg-gray-400 hover:text-black bg-gray-300 rounded-3xl px-3 py-1 text-md text-gray-800 mr-2 mb-2">tag 2</p>
                    </div>
                </div>

                <div className="flex items-center justify-between py-4">
                    <Link to={"/events/id/" + eventId} className="text-lg px-2 py-2 flex items-center leading-snug bg-white text-indigo-700 bg-gray-200 font-bold border-black rounded">
                        See more
                    </Link>
                </div>
            </div>
        </div>
    </div>

    
        
    );
}

export default EventCard;