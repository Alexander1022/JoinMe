import React from "react";
import {useState} from "react";
import FacebookLogin from 'react-facebook-login';
import axios from "axios";
import {Navigate, useLocation} from "react-router-dom";
import backgroundImage from '../assets/login_background.jpg';

function FacebookLoginComponent({ setAuth,  isAuthenticated})
{
    const [login, setLogin] = useState(false);
    const [data, setData] = useState({});
    const [picture, setPicture] = useState('');
    const location = useLocation();

    const ResponseFromFacebook = (response) => {
        setData(response);
        
        if(response.accessToken)
        {
            setLogin(true);
            setPicture(response.picture.data.url);

            const user = {
                full_name: data.name,
                nickname: data.name.toLowerCase().replace(/\s/g, '_'),
                email: data.email,
                gender: data.gender,
                picture: data.picture.data.url,
                friendsCount: 0
            }

            axios.post(process.env.REACT_APP_BACKEND_ADDRESS + '/users/add', user)
                .then(function(res)
                {
                    const generatedToken = res.data.jmtoken;

                    if(generatedToken)
                    {
                        localStorage.setItem("jmtoken", generatedToken);
                        setAuth(true);
                    }

                    else
                    {
                        setAuth(false);
                    }
                });
        }   

        else
        {
            setLogin(false);
        }
    }

        return isAuthenticated ? (<Navigate to={location.state.from.pathname} />
        ) : ( 
            <div className="flex justify-start items-center flex-col h-screen">
                <div className="relative w-full h-full bg-black">
                    <img 
                    className="w-full h-full object-cover relative bg-fixed bg-center bg-cover bg-no-repeat bg-white opacity-60	"
                    src={backgroundImage}  
                    alt="Login Background"  
                    />

                    <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0">
                        <div className="p-5">
                            <h1 className="text-white text-7xl">
                                JoinMe
                            </h1>
                        </div>

                        <div className="shadow-2xl">
                            <FacebookLogin
                                appId="431414811957754"
                                autoLoad={false}
                                fields="id, name, email, picture.width(500).height(500), gender, posts.limit(10)"
                                scope="public_profile, user_location, user_likes, user_events, user_friends, user_posts, user_gender, user_photos, email"
                                callback={ResponseFromFacebook}
                                cssClass="bg-white text-black font-bold py-2 px-4 border-black hover:border-black rounded hover:bg-blue-600 hover:text-white"
                            />
                        </div>
                    </div>  
                </div>
            </div>
        );
}


export default FacebookLoginComponent;