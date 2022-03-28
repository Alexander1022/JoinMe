import React, {Fragment, useRef} from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes
} from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import FacebookLoginComponent from "./components/FacebookLogin";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/UserProfile";
import Logout from "./components/Logout";
import Events from "./components/Events";
import EventForm from "./components/CreateEvent";
import EventDetails from "./components/EventDetails";
import People from "./components/People";
import UserDetails from "./components/UserDetails";

import io from "socket.io-client";
import Settings from "./components/Settings";


const App = () => {
    const socket = useRef();
    const checkAuthenticated = async () => {
        try 
        {
            if(localStorage.jmtoken)
            {
                const jmtoken = localStorage.jmtoken;
                
                axios.post(process.env.REACT_APP_BACKEND_ADDRESS + '/users/verify', {}, {headers: {'jmtoken': `${jmtoken}` }})
                    .then(function(res)
                    {
                        if(res.data === true)
                        {
                            setIsAuthenticated(true);
                        }

                        else
                        {
                            setIsAuthenticated(false);
                        }
                    });
            }
        } 
        
        catch (err) 
        {
          console.error(err.message);
        }
    };

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    const setAuth = boolean => {
        setIsAuthenticated(boolean);
    };

    useEffect(() => {
        socket.current = io(process.env.REACT_APP_SOCKET_ADDRESS);

        if (!("Notification" in window))
        {
            console.log("This browser does not support desktop notification");
        }

        else
        {
            Notification.requestPermission();
        }

        socket.current.on("getNotification", (data) => {
            try
            {
                axios.get(process.env.REACT_APP_BACKEND_ADDRESS + '/users/id/' + data.s_id, {headers: {'jmtoken': localStorage.jmtoken}})
                    .then(function (res)
                    {
                            console.log(res.data.nickname);
                            var options = {
                                body: "You are friends with " + res.data.nickname + "! Join some events together!",
                                dir: "auto"
                            };
                            new Notification("JoinMe", options);
                    })
            }

            catch (err)
            {
                console.error(err.message);
            }
        });
    }, []);

    useEffect(() => {
        if(localStorage.jmtoken)
        {
            socket.current.emit("newUser", localStorage.jmtoken);
        }
    }, [socket]);

    useEffect(() => {
        checkAuthenticated();
    }, [isAuthenticated]);
    
    return (
        <Fragment>
        <Router>
                <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>

                <Routes>
                    <Route exact path='/' element={<HomePage isAuthenticated={isAuthenticated} />} />
                    <Route exact path='/signUp' element={<FacebookLoginComponent />} />
                    <Route element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
                        <Route exact path = '/people' element={<People socket={socket} />} />
                        <Route exact path ='/profile' element={<Profile />} />
                        <Route exact path = '/profile/settings' element={<Settings />}/>
                        <Route exact path = '/events' element={<Events />} />
                        <Route exact path = '/events/add' element={<EventForm />} />
                        <Route path = '/events/id/:eventId' element={<EventDetails />} />
                        <Route path = '/users/id/:userId' element={<UserDetails />}/>
                    </Route>

                    <Route exact 
                        path='/signIn' 
                        element={<FacebookLoginComponent 
                        setAuth={setAuth} 
                        isAuthenticated={isAuthenticated}/>}>
                        </Route>
                </Routes>
        </Router>
        </Fragment>
    );
}

export default App;