import React from "react";
import {useState, useEffect} from "react";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import axios from "axios";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

async function GetImage(id, token)
{
    try 
    {
        const response = await axios.get("https://graph.facebook.com/v12.0/" + id + "?fields=full_picture&access_token=" + token);
        if(response.data.full_picture)
        {
            console.log(response.data.full_picture);
            return response.data.full_picture;
        }
    } 
      
    catch (error) 
    {
        console.log("No link available: " + error);
    }
}

const FacebookLoginComponent = ({ setAuth,  isAuthenticated}) =>
{
    const [login, setLogin] = useState(false);
    const [data, setData] = useState({});
    const [picture, setPicture] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    //const [posts, setPosts] = useState([]);

    const ResponseFromFacebook = (response) => {
        setData(response);

        if(response.accessToken)
        {
            setLogin(true);
            setPicture(response.picture.data.url);
            
            // code snippet for getting 10 latest user's posts from Facebook 
            /*let postsUrl = [];
            for(let i = 0 ; i < response.posts.data.length ; i++)
            {
                let post = await GetImage(response.posts.data[i].id, response.accessToken);
                console.log(post);
                if(post != undefined)
                    postsUrl.push(post);
            }*/

            const user = {
                full_name: data.name,
                nickname: data.name.toLowerCase().replace(/\s/g, '_'),
                email: data.email,
                gender: data.gender,
                joiners: 0
            }

            axios.post('http://localhost:5000/users/add', user)
                .then(function(res)
                {
                    const generatedToken = res.data.jmtoken;

                    if(generatedToken)
                    {
                        localStorage.setItem("jmtoken", generatedToken);
                        console.log("The token is set.");
                        setAuth(true);
                    }

                    else
                    {
                        console.log("The token is not set.")
                        setAuth(false);
                    }
                });

            //setPosts(postsUrl);
        }   

        else
        {
            setLogin(false);
        }
    }
        return isAuthenticated ? (<Navigate to='/' />
        ) : ( 
            <div>
                <FacebookLogin
                    appId="431414811957754"
                    autoLoad={false}
                    fields="id, name, email, picture.width(500).height(500), gender, posts.limit(10)"
                    scope="public_profile, user_location, user_likes, user_events, user_friends, user_posts, user_gender, user_photos, email"
                    callback={ResponseFromFacebook}
                    render={renderProps => (
                        <button onClick={renderProps.onClick}>Log In with Facebook</button>
                    )}
                />
            </div>
        );
}


export default FacebookLoginComponent;