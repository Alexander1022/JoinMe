import React from "react";
import Spinner from "./Spinner";

const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

function EventCard({ title, desc, date, time, place, createdAt})
{
    if (!title || !desc || !date || !time || !place || !createdAt) return <Spinner message="Loading event" />;

    createdAt = new Date(createdAt);
    createdAt = createdAt.toLocaleDateString("en-US", dateOptions);


    return (
        

    <div className="w-1/3 p-6 flex flex-col">
        <div>
            <img src="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" className="rounded-lg w-full object-cover h-50" />
        </div>
        
        <div className="bg-white rounded-b-lg">
            <div className="p-4">
                <div className="inline-block items-center">
                    <h2 className="text-3xl font-bold">{title}</h2>
                    <p className="text-md text-black pt-1">{createdAt}</p>
                </div>

                <p className="whitespace-pre-wrap text-md py-3 text-clip text-black mt-2">{desc}</p>
            
                <div className="flex mt-4">
                    <div>
                        <p className="inline-block hover:bg-gray-400 hover:text-black bg-gray-300 rounded px-3 py-1 text-md text-gray-800 mr-2 mb-2">tag 1</p>
                    </div>

                    <div className="pl-2">
                        <p className="inline-block hover:bg-gray-400 hover:text-black bg-gray-300 rounded px-3 py-1 text-md text-gray-800 mr-2 mb-2">tag 2</p>
                    </div>
                </div>

                <div className="flex items-center justify-between py-4">
                    <a className="text-indigo-700 text-lg font-semibold" href={'https://maps.google.com/?q=' + place[0].lat + ',' + place[0].lon} target="_blank">Location</a>
                </div>
            </div>
        </div>
    </div>

    
        
    );
}

export default EventCard;