import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function People()
{
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        try {
            const jmtoken = localStorage.jmtoken;
            axios.get('http://localhost:5000/users/', {headers: {'jmtoken': `${jmtoken}`}})
                .then(function (res) {
                    setLoading(true);

                    if (res.data.length)
                    {
                        console.log(res.data);
                        setUsers(res.data);
                    }

                    setLoading(false);
                })
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="my-auto bg-zinc-900 h-screen">
            <div className="flex mx-auto p-auto flex-col items-center justify-center h-view bg-zinc-900 pb-screen">
                <div className="flex flex-col items-center justify-center py-20">
                    <h1 className="text-4xl font-bold leading-9 text-center text-white">All People</h1>
                </div>
                {
                    users.map(user =>
                    <div className="bg-white rounded-3xl border shadow-xl mb-5 p-6 lg:w-1/2 sm:w-max-md">
                        <div className="flex justify-between items-center mb-4">
                            <img
                                className="inline-flex items-center justify-center w-14 h-14 rounded-full"
                                src={user.picture}
                            />

                            <div>
                                <span className="text-lg font-bold text-gray-700">{user.friendscount} friends</span>
                                <Link to={"/users/id/" + user.user_id} className="text-lg px-2 py-2 flex items-center leading-snug bg-white text-indigo-700 bg-gray-200 hover:bg-gray-300 font-bold border-black rounded">
                                    See more
                                </Link>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg text-indigo-700">{user.gender}</h3>
                            <h1 className="font-semibold text-2xl text-gray-700">{user.nickname}</h1>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

export default People;