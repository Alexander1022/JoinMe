import axios from "axios";
import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";
import {Link, useParams} from "react-router-dom";


const UserDetails = () =>
{
    const userId = useParams().userId;
    const [name, setName ] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [friendsCount, setFriendsCount] = useState(0);
    const [nickname, setNickname] = useState("");
    const [picture, setPicture] = useState("");
    const [userEvents, setUserEvents] = useState([]);
    const [eventsLoading, setEventsLoading] = useState(false);

    const getData = async () => {
        const jmtoken = localStorage.jmtoken;
        try
        {
            axios.get('http://localhost:5000/users/id/' + userId, {headers: {'jmtoken': `${jmtoken}` }})
                .then(function(res)
                {
                    setName(res.data.full_name);
                    setGender(res.data.gender);
                    setEmail(res.data.email);
                    setFriendsCount(res.data.friendscount);
                    setNickname(res.data.nickname);
                    setPicture(res.data.picture);
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

    if (!name) return <Spinner message="Loading profile" />;

    return (
        <div className="flex mt-auto pb-0 h-screen justify-center items-center bg-zinc-900">
            <div className="flex pb-5">
                <div className="flex p-5 flex-col mb-7 border-1 rounded-xl shadow-xl lg:max-w-md max-w-sm overflow-hidden bg-white">
                    <div className="flex h-view flex-col justify-center items-center">
                        <img
                            className="w-full rounded-lg"
                            src={picture}
                            alt="User Profile Picture" />

                        <div className="px-6 py-4">
                            <h2 className="font-bold text-3xl mb-2">{nickname}</h2>


                            <h3 className="inline-flex items-center justify-center px-2 py-1 text-xl font-bold leading-none text-white bg-indigo-700 rounded">
                                {gender}
                            </h3>

                            <h3 className="text-gray-700 text-xl">
                                {email}
                            </h3>

                            <span className="inline-flex items-center justify-center px-2 py-1 text-lg leading-none text-white bg-emerald-900 rounded-full">
                                You currently have {friendsCount} friends
                            </span>
                        </div>

                        <div className="px-6 pt-4 pb-2">
                            <span className="inline-block bg-gray-300 rounded-full px-3 py-1 text-md font-semibold text-gray-800 mr-2 mb-2">#tag 1</span>
                            <span className="inline-block bg-gray-300 rounded-full px-3 py-1 text-md font-semibold text-gray-800 mr-2 mb-2">#tag 2</span>
                            <span className="inline-block bg-gray-300 rounded-full px-3 py-1 text-md font-semibold text-gray-800 mr-2 mb-2">#tag 3</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDetails;