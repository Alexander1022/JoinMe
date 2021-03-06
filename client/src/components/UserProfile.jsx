import axios from "axios";
import React, {useState, useEffect, useRef} from "react";
import Spinner from "./Spinner";
import {Link} from "react-router-dom";
import MyChart from "./MyChart";
import { motion } from "framer-motion";

function Profile()
{
    const [name, setName ] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [friendsCount, setFriendsCount] = useState(0);
    const [nickname, setNickname] = useState("");
    const [picture, setPicture] = useState("");
    const [userEvents, setUserEvents] = useState([]);
    const [interests, setInterests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dataSet, setDataSet] = useState([]);

    const getData = async () => {
        const jmtoken = localStorage.jmtoken;
        try
        {
            setLoading(true);
            axios.post(process.env.REACT_APP_BACKEND_ADDRESS + '/users/profile', {}, {headers: {'jmtoken': `${jmtoken}` }})
                .then(function(res)
                {
                    setName(res.data.full_name);
                    setGender(res.data.gender);
                    setEmail(res.data.email);
                    setFriendsCount(res.data.friendscount);
                    setNickname(res.data.nickname);
                    setPicture(res.data.picture);
                });

            axios.get(process.env.REACT_APP_BACKEND_ADDRESS + '/events/createdByMe',{headers: {'jmtoken': `${jmtoken}` }})
                .then(function (res)
                {
                   if(res.data.length)
                   {
                       setUserEvents(res.data);
                   }
                });

            axios.get(process.env.REACT_APP_BACKEND_ADDRESS + '/users/profile/interests', {headers: {'jmtoken': `${jmtoken}` }})
                .then(function(res)
                {
                    setInterests(res.data.interest);
                    setDataSet(res.data.count);
                });

            setLoading(false);
        }

        catch(error)
        {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    if (loading) return <Spinner message="Loading profile" />;

    return (
        <div className="my-auto bg-zinc-900 h-screen">
        <div className="flex mt-auto pt-10 pb-0 h-view justify-center items-center bg-zinc-900">
            <div className="flex pb-5">
                <div className="flex p-5 flex-col mb-7 border-1 rounded-xl shadow-xl lg:max-w-md max-w-sm overflow-hidden bg-white transition-opacity ease-in-out duration-300">
                    <div className="flex h-view flex-col justify-center items-center duration-300">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                            <img
                                className="w-full rounded-lg shadow-xl transition ease-in-out	duration-100 hover:scale-105"
                                src={picture}
                                alt="User Profile Picture"
                                referrerPolicy="no-referrer"
                            />
                        </motion.div>
                        <div className="px-6 py-4 duration-300">
                            <h2 className="font-bold text-3xl mb-2">{nickname}</h2>


                            <h3 className="inline-flex items-center justify-center px-2 py-1 text-xl font-bold leading-none text-white bg-indigo-700 rounded">
                                {gender}
                            </h3>

                            <h3 className="text-gray-700 text-xl">
                                {email}
                            </h3>

                            {
                                friendsCount == 1 ? (
                                    <span className="inline-flex items-center justify-center px-2 py-1 text-lg leading-none text-white bg-emerald-900 rounded-full transition-all duration-300">
                                        You currently have {friendsCount} friend
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center justify-center px-2 py-1 text-lg leading-none text-white bg-emerald-900 rounded-full transition-all duration-300">
                                        You currently have {friendsCount} friends
                                    </span>
                                )
                            }

                        </div>

                        <div className="px-6 pt-4 pb-2 duration-300">
                            {
                                interests.map(interest =>
                                    <span
                                        key={interest}
                                        className="inline-block bg-gray-300 rounded-full px-3 py-1 text-md font-semibold text-gray-800 mr-2 mb-2 transition-all	ease-in-out duration-300">{interest}
                                    </span>
                                )
                            }

                            {
                                interests.length ? (<div> </div>) : (<h1 className="text-center text-xl">No data for interests????</h1>)
                            }
                        </div>

                        <div>
                            <MyChart interests={interests} dataSet={dataSet} />
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
                                userEvents.length ? (<div> </div>) : (<h1 className="text-center text-xl">No data for created events????</h1>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Profile;