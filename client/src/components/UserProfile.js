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
                <div className="flex p-5 flex-col mb-7 border-1 rounded-xl shadow-xl">
                    <div className="flex h-view flex-col justify-center items-center">
                        <img
                            className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
                            alt="user-pic"
                        />
                    </div>

                    <h1 className="text-2xl text-center mt-3">
                        {nickname}
                    </h1>
                    <h1 className="text-2xl text-center mt-3">
                        {gender}
                    </h1>
                    <h1 className="text-2xl text-center mt-3">
                        {email}
                    </h1>
                    <h1 className="text-2xl text-center mt-3">
                        You currently have {friendsCount} friends
                    </h1>
                </div>  
            </div>
        </div>
    )
}

export default Profile;