import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from 'axios';
import { useState } from "react";
import Spinner from "./Spinner";
import NoCover from '../assets/no_cover_event.png';

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
    const [past, setPast] = useState(false);

    const [loading, setLoading] = useState(false);

    const getData = async () => {
        setLoading(true);
        try
        {
            const jmtoken = localStorage.jmtoken;
            axios.get(process.env.REACT_APP_BACKEND_ADDRESS + '/events/id/' + eventId, {headers: {'jmtoken': `${jmtoken}` }})
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

                    if(new Date(res.data[0].date) < new Date())
                    {
                        setPast(true);
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
    }, []);
    
    if (loading) return <Spinner message="Loading details for event" />;
    
    return (
    <div className="mx-auto bg-zinc-900 h-view flex items-center py-20 justify-center px-8">
        <div className="flex flex-col bg-white rounded-2xl shadow-lg w-3/4">


            {
                cover.length > 1 ? (
                    <img src={cover} className="w-full h-64 bg-top object-cover rounded-t-2xl border-2"></img>
                ) : (
                    <img src={NoCover} className="w-full h-64 bg-top object-cover rounded-t-2xl border-2"></img>
                )
            }
            <div className="flex flex-col w-full md:flex-row">
                <div className="flex p-4 font-bold leading-none text-white uppercase bg-zinc-900 rounded-bl-2xl flex-col items-center justify-center md:w-1/4 md:p-20 border-2">
                    {past ? (<div className="md:text-3xl">Event was on {date} {time}</div>):
                        (<div className="md:text-3xl">Event is on {date} {time}</div>)
                    }
                </div>

                <div className="font-normal text-gray-800 w-3/4 p-10">
                    <h1 className="mb-4 text-4xl font-bold leading-none tracking-tight text-gray-800">{title}</h1>
                    <div className="flex align-items-center mt-4">
                            {
                                tags.map((tag) => 
                                    <div key={tag}>
                                        <p className="text-center cursor-default flex hover:bg-gray-400 hover:text-black bg-gray-300 rounded-3xl px-3 py-1 text-md text-gray-800 mr-2 mb-2">{tag}</p>
                                    </div>
                                )
                            }
                    </div>
                    
                    <div className="w-1/2 flex mb-5">
                            <a className="text-indigo-700 text-lg font-semibold" href={'https://maps.google.com/?q=' + lat + ',' + lng} target="_blank">🗺️ Google Maps</a>
                    </div>
                    
                    <p className="leading-normal whitespace-pre-line">{desc}</p>
                    <div className="flex flex-col items-start mt-4 text-gray-700">
                        <div className="font-bold">
                            Created at {createdAt}
                        </div>            
                    </div>
                </div>
            </div>
        </div>
    </div>

 );
}

export default EventDetails;