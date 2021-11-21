import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    BrowserRouter as Router,
    Route,
    Routes
} from 'react-router-dom';
import NewUserForm from "./components/NewUserForm";
import Navbar from "./components/Navbar";
import Users from "./components/Users";
import HomePage from "./components/HomePage";

const App = () => {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path='/' element={<HomePage />}></Route>
                    <Route path='/users' element={<Users />}></Route>
                    <Route path='/users/add' element={<NewUserForm />}></Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;