import React, { Fragment } from "react";
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


const App = () => {
    const [socket, setSocket] = useState(null);

    const checkAuthenticated = async () => {
        try 
        {
            if(localStorage.jmtoken)
            {
                const jmtoken = localStorage.jmtoken;
                
                axios.post('http://localhost:5000/users/verify', {}, {headers: {'jmtoken': `${jmtoken}` }})
                    .then(function(res)
                    {
                        if(res.data === true)
                        {
                            console.log("User is fine");
                            setIsAuthenticated(true);
                        }

                        else
                        {
                            console.log("User is not fine. Probably some data in backend is lost.");
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
        setSocket(io("http://localhost:1000"));

        if (!("Notification" in window))
        {
            console.log("This browser does not support desktop notification");
        }

        else
        {
            Notification.requestPermission();
        }
    }, []);

    useEffect(() => {
        console.log("Checking if you are authorized...");
        checkAuthenticated();
    }, [isAuthenticated]);
    
    return (
        <Fragment>
        <Router>
                <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>

                <Routes>
                    <Route exact path='/' element={<HomePage />} />
                    <Route exact path='/signUp' element={<FacebookLoginComponent />} />
                    <Route element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
                        <Route exact path = '/people' element={<People />} />
                        <Route exact path ='/profile' element={<Profile />} />
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