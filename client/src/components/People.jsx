import React, {useEffect, useState} from "react";
import axios from "axios";
import UserCard from "./UserCard";

function People()
{
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        try
        {
            const jmtoken = localStorage.jmtoken;
            axios.get('http://localhost:5000/users/', {headers: {'jmtoken': `${jmtoken}`}})
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

    return (
        <div className="my-auto bg-zinc-900 h-screen">
            <div className="flex mx-auto p-auto flex-col items-center justify-center h-view bg-zinc-900 pb-screen">
                <div className="flex flex-col items-center justify-center py-20">
                    <h1 className="text-4xl font-bold leading-9 text-center text-white">All People</h1>
                </div>
                {
                    users.map(user =>
                    <UserCard id={user.user_id} nickname={user.nickname} picture={user.picture} gender={user.gender} createdAt={user.createdat} />
                )}

            </div>
        </div>
    );
}

export default People;