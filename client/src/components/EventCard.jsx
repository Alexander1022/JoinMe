import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import noCover from '../assets/no_cover_event.png';
import axios from "axios";
import {FaHeart} from "react-icons/fa"

const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

function EventCard({ title, desc, date, time, place, createdAt, eventId, cover, tags })
{
    const [creator, setCreator] = useState("");
    const [creatorId, setCreatorId] = useState(0);
    const [isFav, setFav] = useState(false);

    const jmtoken = localStorage.jmtoken;

    date = new Date(date);
    date = date.toLocaleDateString("en-US", dateOptions);

    const getData = async () => {
        try
        {
            axios.get(process.env.REACT_APP_BACKEND_ADDRESS + '/events/id/' + eventId + '/creator', {headers: {'jmtoken': `${jmtoken}`}})
                .then(function(res)
                {
                    setCreator(res.data.nickname);
                    setCreatorId(res.data.user_id);
                })

            axios.get(process.env.REACT_APP_BACKEND_ADDRESS + '/events/id/' + eventId + '/fav', {headers: {'jmtoken': `${jmtoken}`}})
                .then(function(res)
                {
                    if(res.data.answer === true)
                    {
                        setFav(true);
                    }
                })
        }

        catch (error)
        {
            console.log(error.message);
        }
    };

    const addToFav = async () => {
        try
        {
           axios.post(process.env.REACT_APP_BACKEND_ADDRESS + '/events/id/' + eventId +'/fav', {}, {headers: {'jmtoken': `${jmtoken}`}})
               .then(function(res)
               {
                    if(res.data.answer === true)
                    {
                        setFav(true);
                    }
               });
        }

        catch (error)
        {
            console.log(error.message);
        }
    }

    const removeFromFav = async () => {
        try
        {
          axios.delete(process.env.REACT_APP_BACKEND_ADDRESS + '/events/id/' + eventId + '/fav', {headers: {'jmtoken': `${jmtoken}`}})
              .then(function(res)
              {
                  if(res.data.answer === true)
                  {
                      setFav(false);
                  }
              });
        }

        catch (error)
        {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getData();
    }, [creator]);

    if (!title || !desc || !date || !time || !place || !createdAt || !tags) return <Spinner message="Loading event" />;

    return (
    
    <div key={eventId.toString()} className="xl:w-1/3 xl:mx-5 sm:w-3/4 md:w-2/5 mx-2 relative mt-16 mb-32 sm:mb-14 xl:max-w-1/2 lg:w-2/5">
        <div>
            {
            cover ? (
                <img src={cover} className="rounded-t-3xl w-full object-cover h-40" />
            ) : (
                <img src={noCover} className="rounded-t-3xl w-full object-cover h-40" />)
            }
            
        </div>
        
        <div className="bg-white rounded-b-3xl duration-300">
            <div className="p-4">
                <div className="inline-block items-center">
                    <h2 className="text-3xl font-bold">{title}</h2>
                    <p className="text-md text-black pt-1">{date}</p>
                </div>

                <p className="duration-300 line-clamp-1 text-md py-3 text-black mt-2 border-b-2 border-slate-300">{desc}</p>
            
                <div className="flex mt-4 cursor-default">
                    <div>
                        {tags.map((tag) => 
                            <p key={tag} className="duration-300 inline-block hover:bg-gray-400 hover:text-black bg-gray-300 rounded-3xl px-3 py-1 text-md text-gray-800 mr-2 mb-2">{tag}</p>
                        )}
                        
                    </div>
                </div>

                <div className="flex items-center justify-between py-4">

                    <button onClick={isFav ? removeFromFav : addToFav} title={(isFav ? "Click here to remove this event" : "Click here to add this event")} className={"text-lg px-2 py-2 flex items-center leading-snug bg-white " +  (isFav ? "text-indigo-700 " : "text-red ") +  "bg-gray-200 hover:bg-gray-300 font-bold border-black rounded"}>
                        <FaHeart />
                    </button>

                    <Link to={"/events/id/" + eventId} className="duration-300 text-lg px-2 py-2 flex items-center leading-snug bg-white text-indigo-700 bg-gray-200 hover:bg-gray-300 font-bold border-black rounded">
                        See More
                    </Link>

                    <Link className="flex justify-between font-bold" to={"/users/id/" + creatorId}>
                        {creator}
                    </Link>
                </div>
            </div>
        </div>
    </div>

    
        
    );
}

export default EventCard;