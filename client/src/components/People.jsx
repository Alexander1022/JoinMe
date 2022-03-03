import React, {useEffect, useState} from "react";
import axios from "axios";
import UserCard from "./UserCard";
import Spinner from "./Spinner";

function People({socket})
{
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        try
        {
            const jmtoken = localStorage.jmtoken;
            axios.get(process.env.REACT_APP_BACKEND_ADDRESS + '/users/', {headers: {'jmtoken': `${jmtoken}`}})
                .then(function (res)
                {
                    setLoading(true);

                    if (res.data.length)
                    {
                        setUsers(res.data);
                    }

                    setLoading(false);
                })
        }

        catch (error)
        {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    if (loading) return <Spinner message="Loading people" />;

    return (
        <div className="my-auto bg-zinc-900 h-screen">
            <div className="flex mx-auto p-auto flex-col items-center justify-center h-view bg-zinc-900 pb-screen">
                <div className="flex flex-col items-center justify-center py-20">
                    <h1 className="text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-blue-600 font-extrabold sm:text-4xl md:text-5xl lg:text-6xl text-4xl duration-300">People</h1>
                </div>

                {
                    users.map(user =>
                    <UserCard socket={socket} key={user.user_id} id={user.user_id} nickname={user.nickname} picture={user.picture} gender={user.gender} createdAt={user.createdat} />
                )}

            </div>
        </div>
    );
}

export default People;