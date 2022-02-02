import React, { Fragment } from "react";
import {
    BrowserRouter as Router,
    Navigate,
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

const App = () => {

    const checkAuthenticated = async () => {
        try 
        {
            if(localStorage.jmtoken)
            {
                const jmtoken = localStorage.jmtoken;
                
                axios.post('http://localhost:5000/users/verify', {}, {headers: {'jmtoken': `${jmtoken}` }})
                    .then(function(res)
                    {
                        if(res.data == true)
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

    useEffect(() => {
        console.log("Checking if you are authorized...");
        checkAuthenticated();
    }, []);

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    const setAuth = boolean => {
        setIsAuthenticated(boolean);
    };
    
    return (
        <Fragment>
        <Router>
                <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>

                <Routes>
                    <Route exact path='/' element={<HomePage />} />
                    <Route exact path='/signUp' element={<FacebookLoginComponent />} />
                    <Route element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
                        <Route exact path ='/profile' element={<Profile />} />
                        <Route exact path = '/events' element={<Events />} />
                        <Route exact path = '/events/add' element={<EventForm />} />
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