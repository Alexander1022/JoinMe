import axios from "axios";
import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";
import ProfileBackground from '../assets/profile_background.jpg';


const Profile = () =>
{
    const [name, setName ] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGedner] = useState("");
    const [friendsCount, setFriendsCount] = useState(0);
    const [nickname, setNickname] = useState("");
    const [picture, setPicture] = useState("");

    const getData = async () => {
        const jmtoken = localStorage.jmtoken;
        try
        {   
            axios.post('http://localhost:5000/users/profile', {}, {headers: {'jmtoken': `${jmtoken}` }})
                .then(function(res)
                {
                    setName(res.data.full_name);
                    setGedner(res.data.gender);
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
        <div className="flex pb-0 h-screen justify-center items-center">
            <div className="flex flex-col pb-5">
                <div className="flex p-5 flex-col mb-7 border-1 rounded-xl shadow-xl max-w-sm overflow-hidden">
                    <div className="flex h-view flex-col justify-center items-center">
                        <img 
                            className="w-full" 
                            src={picture} 
                            alt="User Profile Picture" />

                        <div className="px-6 py-4">
                            <h2 className="font-bold text-3xl mb-2">{nickname}</h2>

                            <h3 class="inline-flex items-center justify-center px-2 py-1 text-xl font-bold leading-none text-indigo-100 bg-indigo-700 rounded">
                                {gender}
                            </h3>

                            <h3 className="text-gray-700 text-xl">
                                {email}
                            </h3>

                            <span class="inline-flex items-center justify-center px-2 py-1 text-lg font-bold leading-none text-red-100 bg-emerald-900 rounded-full">
                                You currently have {friendsCount} friends
                            </span>
                        </div>

                        <div className="px-6 pt-4 pb-2">
                            <span className="inline-block bg-gray-300 rounded-full px-3 py-1 text-md font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                            <span className="inline-block bg-gray-300 rounded-full px-3 py-1 text-md font-semibold text-gray-700 mr-2 mb-2">#coding</span>
                            <span className="inline-block bg-gray-300 rounded-full px-3 py-1 text-md font-semibold text-gray-700 mr-2 mb-2">#vaporwave</span>
                        </div>
                    </div>
                </div>                 
            </div>
        </div>
    )
}

export default Profile;