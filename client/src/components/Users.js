import React, { Component } from 'react';
import axios from 'axios';

const User = props => (
    <div>
        <h1 key="{props.user.username}">{props.user.username}</h1>
        <h1 key="{props.user.name}">{props.user.name}</h1>
        <h1 key="{props.user.middle_name}">{props.user.middle_name}</h1>
        <h1 key="{props.user.age}">{props.user.age}</h1>
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
