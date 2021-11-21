import React, { Component } from 'react';
import axios from 'axios';

const User = props => (
    <div>
        <h1>{props.user.username}</h1>
        <h1>{props.user.name}</h1>
        <h1>{props.user.middle_name}</h1>
    </div>
)

class Users extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            users: []
        }
    }

    componentDidMount()
    {
        axios.get('http://localhost:5000/users')
            .then(response => {
                this.setState({
                    users: response.data
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    usersList()
    {
        return this.state.users.map(currentUser => {
            return <User user={currentUser} />
        })
    }

    render()
    {
        return(
            <div>
                <h2>
                    Users
                </h2>

                { this.usersList() }

            </div>
        )
    }
}

export default Users;
