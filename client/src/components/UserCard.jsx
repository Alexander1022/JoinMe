import React, {useEffect, useState} from "react";
import NoProfilePic from "../assets/no_cover_event.png";
import {Link} from "react-router-dom";
import axios from "axios";
import { FaHandshake } from "react-icons/fa";

const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };


function UserCard({id, picture, gender, nickname, createdAt, socket})
{
    const [isMyFriend, setMyFriends] = useState(false);
    const [friendscount, setFriendscount] = useState(0);
    const joinedDate = new Date(createdAt).toLocaleDateString("en-US", dateOptions);
    const jmtoken = localStorage.jmtoken;

    const getData = async () => {
        try
        {
            axios.get(process.env.REACT_APP_BACKEND_ADDRESS + '/friendships/check/id/' + id, {headers: {'jmtoken': `${jmtoken}`}})
                .then(function (res)
                {
                    if(res.data == true)
                    {
                        setMyFriends(true);
                    }
                })

            axios.get(process.env.REACT_APP_BACKEND_ADDRESS + '/friendships/friendsCounter/id/' + id, {headers: {'jmtoken': `${jmtoken}`}})
                .then(function(res)
                {
                    setFriendscount(res.data.friends);
                })
        }

        catch (error)
        {
            console.log(error.message);
        }
    }

    const addFriend = async () => {
        try
        {
            axios.post(process.env.REACT_APP_BACKEND_ADDRESS + '/friendships/create/id/' + id, {}, {headers: {'jmtoken': `${jmtoken}`}})
                .then(function (res)
                {
                    if(res.data.answer === true)
                    {
                        setMyFriends(true);

                        var options = {
                            body: res.data.message,
                            dir: "auto"
                        };

                        new Notification("JoinMe", options);

                        socket.current.emit("sendNotification", {
                           senderToken: localStorage.jmtoken,
                           receiverId: id
                        });
                    }
                })
        }

        catch (error)
        {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getData();
    }, [isMyFriend]);

    return (
        <div key={id} className="bg-white rounded-3xl border shadow-xl mb-5 p-6 lg:w-1/2 sm:w-max-md">
            <div className="flex justify-between items-center mb-4">
                {
                    picture.length > 1 ? (
                        <img
                            className="inline-flex items-center justify-center w-20 h-20 rounded-full"
                            src={picture}
                        />
                    ) : (
                        <img
                            className="inline-flex items-center justify-center w-20 h-20 rounded-full"
                            src={NoProfilePic}
                        />
                    )
                }

                <div>
                    {
                        friendscount == 1 ? (<span className="text-lg font-bold text-gray-700">They have {friendscount} friend</span>) :
                            (<span className="text-lg font-bold text-gray-700">They have {friendscount} friends</span>)
                    }

                    <Link to={"/users/id/" + id} className="justify-center text-lg px-2 py-2 flex items-center leading-snug bg-white text-indigo-700 bg-gray-200 hover:bg-gray-300 font-bold border-black rounded">
                        See more
                    </Link>
                </div>
            </div>

            <div>
                <h1 className="font-semibold text-lg text-indigo-700">{gender}</h1>
                <h1 className="font-semibold text-2xl text-gray-700">{nickname}</h1>
            </div>

            <div className="flex justify-between">
                {
                    isMyFriend? (
                            <p className="text-xl mt-3 flex items-center leading-snug">
                                Your friend
                                <FaHandshake className="ml-2 text-xl leading-lg" />
                            </p>
                    ) : (
                        <button onClick={addFriend} className="text-md mt-5 px-6 py-4 rounded-md bg-green-500 text-indigo-50 font-semibold cursor-pointer">
                            Add friend
                        </button>
                    )
                }

                <h1 className="text-lg font-bold">📅 Joined on {joinedDate}</h1>

            </div>
        </div>
    );
}

export default UserCard;