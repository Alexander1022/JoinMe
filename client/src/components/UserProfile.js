import axios from "axios";
import React, { useState, useEffect } from "react";

const Profile = ({ setAuth }) =>
{
    const [name, setName ] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGedner] = useState("");

    const getData = async () => {
        const jmtoken = localStorage.jmtoken;
        try
        {   
            axios.post('http://localhost:5000/users/profile', {}, {headers: {'jmtoken': `${jmtoken}` }})
                .then(function(res)
                {
                    setName(res.name);
                    setGedner(res.gender);
                    setEmail(res.email);
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
            <h1>Hello {name}</h1>
            <p>{gender}</p>
            <p>{email}</p>
        </div>
    )
}

export default Profile;