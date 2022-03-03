import React, {useEffect, useState} from "react";
import axios from 'axios';

function Settings()
{
    const [nickname, setNickname] = useState("");
    const jmtoken = localStorage.jmtoken;

    const getData = async() => {
        try
        {
            axios.post(process.env.REACT_APP_BACKEND_ADDRESS + '/users/profile', {}, {headers: {'jmtoken': `${jmtoken}` }})
                .then(function (res)
                {
                    setNickname(res.data.nickname);
                });
        }

        catch(error)
        {
            console.log(error.message);
        }
    };

    const changeNickname = (event) => {
        event.preventDefault();

        const newNickname = {
            nickname: nickname
        }

        try
        {
            axios.post(process.env.REACT_APP_BACKEND_ADDRESS + '/users/profile/changeNickname', newNickname, {headers: {'jmtoken': `${jmtoken}` }})
                .then(function(res)
                {
                    if(res.data.answer === true)
                    {
                        setNickname(res.data.data.nickname);

                        var options = {
                            body: "You changed your nickname.",
                            dir: "auto"
                        };

                        new Notification("JoinMe", options);
                    }
                });
        }

        catch(error)
        {
            console.log(error.message);
        }
    };

    const handleChange = (event) => {
          setNickname(event.target.value);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="my-auto h-screen bg-gradient-to-br from-pink-400 to-blue-600">
            <div className="flex items-center justify-center min-h-screen">
                <div className='w-screen max-w-lg px-5 py-8 mx-auto bg-white rounded-lg shadow-2xl duration-300'>
                    <div className='max-w-md mx-auto space-y-6'>
                        <form onSubmit={changeNickname}>
                            <h2 className="text-4xl font-bold">Change your nickname 🔧</h2>

                            <hr className="my-6" />

                            <label className="uppercase text-sm font-bold opacity-70">Name</label>
                            <input
                                value={nickname}
                                placeholder="Type your new nickname"
                                required
                                type="text"
                                minLength={8}
                                onChange={handleChange}
                                className="p-3 mt-2 mb-4 w-full bg-slate-200 rounded focus:border-slate-600 outline-none"
                            />

                            <input
                                type="submit"
                                className="py-3 px-6 my-2 text-white font-medium rounded bg-indigo-700 cursor-pointer ease-in-out duration-300"
                                value="Change Nickname"
                            />
                        </form>

                    </div>
                </div>
            </div>

        </div>
    );
}

export default Settings;