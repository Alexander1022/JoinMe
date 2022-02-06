import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from 'axios';
import { useState } from "react";
import Spinner from "./Spinner";

function EventDetails()
{
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateCreatedAtOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

    const eventId = useParams().eventId;
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [cover, setCover] = useState("");
    const [tags, setTags] = useState([]);

    const [loading, setLoading] = useState(false);

    const getData = async () => {
        setLoading(true);
        try
        {   
            axios.get('http://localhost:5000/events/id/' + eventId)
                .then(function(res)
                {
                    setTitle(res.data[0].title);
                    setDesc(res.data[0].description);
                    setDate(new Date(res.data[0].date).toLocaleDateString("en-US", dateOptions).replace(/,/g, ''));
                    setTime(res.data[0].time.replace(/,/g, ''));
                    setCreatedAt(new Date(res.data[0].createdAt).toLocaleDateString("en-US", dateCreatedAtOptions));
                    setLat(res.data[0].place[0].lat);
                    setLng(res.data[0].place[0].lon);
                    setCover(res.data[0].coverUrl);
                    setTags(res.data[0].tags);
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
    }, []);
    
    if (loading) return <Spinner message="Loading details for event" />;
    
    return (
    <div className="mx-auto bg-zinc-900 h-view flex items-center py-20 justify-center px-8">
        <div className="flex flex-col w-full bg-white rounded-2xl shadow-lg sm:w-3/4 md:w-2/3 lg:w-3/5">
            <img src={cover} className="w-full h-64 bg-top object-cover rounded-t-2xl border-2"></img>
            <div className="flex flex-col w-full md:flex-row">
                <div className="flex flex-row justify-around p-4 font-bold leading-none text-white uppercase bg-zinc-900 md:rounded-bl-2xl md:flex-col md:items-center md:justify-center md:w-1/4 md:p-20 border-2">
                    <div className="md:text-3xl">{date} {time}</div>
                </div>

                <div className="p-4 font-normal text-gray-800 md:w-3/4 md:p-10">
                    <h1 className="mb-4 text-4xl font-bold leading-none tracking-tight text-gray-800">{title}</h1>
                    <p className="leading-normal whitespace-pre-line">{desc}</p>
                    <div className="flex flex-col items-start mt-4 text-gray-700">
                        <div className="font-bold">
                            Created at {createdAt}
                        </div>
                        <div className="w-1/2 flex">
                            <a className="text-indigo-700 text-lg font-semibold" href={'https://maps.google.com/?q=' + lat + ',' + lng} target="_blank">🗺️ Google Maps</a>
                        </div>
                        <div className="w-full border-t border-gray-600">
                            <h1 className="text-lg mt-4">Tags:</h1>
                            <div className="flex mt-4">
                            {
                                tags.map((tag) => 
                                    <div>
                                        <p className="cursor-default inline-block hover:bg-gray-400 hover:text-black bg-gray-300 rounded-3xl px-3 py-1 text-md text-gray-800 mr-2 mb-2">{tag}</p>
                                    </div>
                                )
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

 );
}

export default EventDetails;