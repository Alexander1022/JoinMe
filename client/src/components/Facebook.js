import React, { Component } from "react";

class Facebook extends Component
{
    state = {
        isLoggedIn: false,
        userId: '',
        name: '',
        email: '',
        picture: ''
    };

    responseFacebook = (response) => {
        console.log(response);

        this.setState({
            isLoggedIn: true,
            userId: '',
            name: '',
            email: '',
            picture: ''
        });
    }

    // here we render the Facebook login button 
    
    render()
    {
        if(this.state.isLoggedIn)
        {

            return (
                <div>
                    <h1>Hello, user</h1>
                </div>
            )
        }

        else
        { 
            return (
                <div>
                    
                </div>
            )
        }
    }
}

export default Facebook;