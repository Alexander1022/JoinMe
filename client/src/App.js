import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes
} from 'react-router-dom';
import NewUserForm from "./components/NewUserForm";
import Navbar from "./components/Navbar";
import Users from "./components/Users";
import HomePage from "./components/HomePage";
import FacebookLogin from "./components/FacebookLogin";

const App = () => {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path='/' element={<HomePage />}></Route>
                    <Route path='/users' element={<Users />}></Route>
                    <Route path='/users/add' element={<NewUserForm />}></Route>
                    <Route path='/loginFacebook' element={<FacebookLogin />}></Route>
                </Routes>
            </div>
        </Router>

    );
}

export default App;