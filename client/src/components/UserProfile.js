import axios from "axios";
import React, { useState, useEffect } from "react";

const Profile = () =>
{
    const [name, setName ] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGedner] = useState("");
    const [joiners, setJoiners] = useState(0);
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
                    setJoiners(res.data.joiners);
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

    return (
        <div>
            <h1>Hello, {name} ({nickname})</h1>
            <p>Gender : {gender}</p>
            <p>Email : {email}</p>
            <p>You currently have {joiners} joiners</p>
        </div>
    )
}

export default Profile;