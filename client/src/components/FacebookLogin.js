import React from "react";
import {useState} from "react";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import axios from "axios";

async function getImage(id, token)
{
    try 
    {
        const response = await axios.get("https://graph.facebook.com/v12.0/" + id + "?fields=full_picture&access_token=" + token);
        return response.data.full_picture;
    } 
      
    catch (error) 
    {
        console.log("No link available");
    }
}

function FacebookLoginComponent()
{
    const [login, setLogin] = useState(false);
    const [data, setData] = useState({});
    const [picture, setPicture] = useState('');
    const [posts, setPosts] = useState({});

    const responseFromFacebook = (response) => {
        console.log(response);
        setData(response);
        
        if(data.accessToken)
        {
            setLogin(true);
            setPicture(response.picture.data.url);
            setPosts(response.posts.data);
        }

        else
        {
            setLogin(false);
        }
    }

    return (
        <div>
            {!login &&
                <FacebookLogin
                    appId="317133779964042"
                    autoLoad={false}
                    fields="id, name, email, picture.width(500).height(500), gender, posts.limit(10)"
                    scope="public_profile, user_location, user_likes, user_events, user_friends, user_posts, user_gender, user_photos, email"
                    callback={responseFromFacebook}
                    render={renderProps => (
                        <button onClick={renderProps.onClick}>Log In with Facebook</button>
                    )}
                />
            }

            {login &&
                <div>
                    <h1>
                        {data.name}
                    </h1>

                    <h1>
                        {data.email}
                    </h1>
                    
                    <h1>
                        {data.gender}
                    </h1>

                    <img src={picture} alt="profile_pic"/>
                </div>
            }
        </div>
    );
}


export default FacebookLoginComponent;