import axios from "axios";
import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";
import {Link, useParams, Navigate} from "react-router-dom";
import NoProfilePic from "../assets/no_cover_event.png";

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
    const [me, setMe] = useState(false);
    const [isMyFriend, setMyFriends] = useState(false);
    const [interests, setInterests] = useState([]);
    const [eventsLoading, setEventsLoading] = useState(false);

    const jmtoken = localStorage.jmtoken;

    const getData = async () => {

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

            axios.get('http://localhost:5000/friendships/check/id/' + userId, {headers: {'jmtoken': `${jmtoken}` }})
                .then(function (res)
                {
                    if(res.data.message)
                    {
                        setMe(true);
                    }

                    else
                    {
                        if(res.data == true)
                        {
                            setMyFriends(true);
                        }

                        else
                        {
                            setMyFriends(false);
                        }
                    }
                });

            axios.get('http://localhost:5000/events/createdBy/' + userId, {headers: {'jmtoken': `${jmtoken}` }})
                .then(function(res)
                {
                    if(res.data.length)
                    {
                        setUserEvents(res.data);
                    }
                });

            axios.get('http://localhost:5000/users/id/' + 2 + '/interests', {headers: {'jmtoken': `${jmtoken}` }})
                .then(function(res)
                {
                    setInterests(res.data.interest);
                });
        }

        catch(error)
        {
            console.log(error.message);
        }
    }

    const addFriend = async () => {
        try
        {
            axios.post('http://localhost:5000/friendships/create/id/' + userId, {}, {headers: {'jmtoken': `${jmtoken}`}})
                .then(function (res)
                {
                    if(res.data.answer == true)
                    {
                        setMyFriends(true);
                    }
                });
        }

        catch (error)
        {
            console.log(error.message);
        }
    }

    const removeFriend = async () => {
        try
        {
            axios.delete('http://localhost:5000/friendships/remove/id/' + userId, {headers: {'jmtoken': `${jmtoken}`}})
                .then(function (res)
                {
                    if(res.data.answer === true)
                    {
                        setMyFriends( false);
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
    }, [isMyFriend]);

    if (!name) return <Spinner message="Loading profile" />;

    return (
        <div className="my-auto bg-zinc-900 h-screen">
            <div className="flex mt-auto pt-10 pb-0 h-view justify-center items-center bg-zinc-900">
            <div className="flex pb-5">
                <div className="flex p-5 flex-col mb-7 border-1 rounded-xl shadow-xl lg:max-w-md max-w-sm overflow-hidden bg-white">
                    <div className="flex h-view flex-col justify-center items-center">
                        {
                            picture.length > 1 ? (
                                <img
                                    className="w-full rounded-lg"
                                    src={picture}
                                    alt="User Profile Picture" />
                            ) : (
                        <img
                            className="w-full rounded-lg"
                            src={NoProfilePic}
                            alt="User Profile Picture" />
                            )
                        }
                        <div className="px-6 py-4">
                            <h2 className="font-bold text-3xl mb-2">{nickname}</h2>


                            <h3 className="inline-flex items-center justify-center px-2 py-1 text-xl font-bold leading-none text-white bg-indigo-700 rounded">
                                {gender}
                            </h3>

                            <h3 className="text-gray-700 text-xl">
                                {email}
                            </h3>

                            {
                                friendsCount == 1 ?
                                    (
                                        <span className="inline-flex items-center justify-center px-2 py-1 text-lg leading-none text-white bg-emerald-900 rounded-full">
                                            {friendsCount} friend
                                        </span>
                                    ) :
                                    (
                                        <span className="inline-flex items-center justify-center px-2 py-1 text-lg leading-none text-white bg-emerald-900 rounded-full">
                                            {friendsCount} friends
                                        </span>)
                            }

                        </div>

                        <div className="px-6 pt-4 pb-2">
                            {
                                interests.map(interest =>
                                    <span key={interest} className="inline-block bg-gray-300 rounded-full px-3 py-1 text-md font-semibold text-gray-800 mr-2 mb-2">{interest}</span>
                                )
                            }

                            {
                                interests.length ? (<div> </div>) : (<h1 className="text-center text-xl">No data for events interests😳</h1>)
                            }
                        </div>

                        <div className="px-6 py-4">
                            <p className="text-xl text-center">
                                Created by {nickname}:
                            </p>

                            {
                                 userEvents.map(userEvent =>
                                    <Link key={userEvent[0]._id} to={"/events/id/" + userEvent[0]._id} className="text-md px-2 py-3 flex items-center leading-snug bg-white text-indigo-700 hover:bg-gray-300 font-bold border-black rounded">
                                        {userEvent[0].title}
                                    </Link>
                                )
                            }

                            {
                                userEvents.length ? (<div> </div>) : (<h1 className="text-center text-xl">No data for created events😥</h1>)
                            }

                        </div>

                        <div>

                            {
                                me ? (<Navigate to="/profile" />) :
                                    (isMyFriend? (
                                    <button onClick={removeFriend} className="text-md mt-5 px-6 py-4 rounded-md bg-red-700 text-indigo-50 font-semibold cursor-pointer">
                                        Remove friend
                                    </button>
                                ) : (
                                    <button onClick={addFriend} className="text-md mt-5 px-6 py-4 rounded-md bg-green-500 text-indigo-50 font-semibold cursor-pointer">
                                        Add friend
                                    </button>
                                ))
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default UserDetails;