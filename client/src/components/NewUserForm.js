import React, { Component } from "react";
import axios from 'axios';

class NewUserForm extends Component
{
    constructor(props)
    {
        super(props);

        this.onChangeNickname = this.onChangeNickname.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeMiddleName = this.onChangeMiddleName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangepassword_user = this.onChangepassword_user.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            middle_name: '',
            nickname: '',
            email: '',
            password_user: '',
            age: '',
            joiners: '',
        }

    }

    onChangeNickname(e)
    {
        this.setState({
            nickname: e.target.value
        })
    }

    onChangeName(e)
    {
        this.setState({
            name: e.target.value
        })
    }

    onChangeMiddleName(e)
    {
        this.setState({
            middle_name: e.target.value
        })
    }

    onChangeAge(e)
    {
        this.setState({
            age: e.target.value
        });
    }

    onChangeEmail(e)
    {
        this.setState({
            email: e.target.value
        })
    }

    onChangepassword_user(e)
    {
        this.setState({
            password_user: e.target.value
        })
    }

    onSubmit(e)
    {
        e.preventDefault();

        const user = {
            name: this.state.name,
            middle_name: this.state.middle_name,
            nickname: this.state.nickname,
            email: this.state.email,
            password_user: this.state.password_user,
            age: this.state.age,
            joiners: 0
        }

        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data));

        this.setState({
            nickname: '',
            name: '',
            middle_name: '',
            email: '',
            password_user: '',
            age: ''
        })
    }

    render()
    {
        return (
            <div>
                <h3>Create New User</h3>

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Nickname: </label>
                        <input  type="text"
                                required
                                className="form-control"
                                value={this.state.nickname}
                                onChange={this.onChangeNickname}
                        />

                        <label>Name: </label>
                        <input  type="text"
                                required
                                className="form-control"
                                value={this.state.name}
                                onChange={this.onChangeName}
                        />

                        <label>Middle Name: </label>
                        <input  type="text"
                                required
                                className="form-control"
                                value={this.state.middle_name}
                                onChange={this.onChangeMiddleName}
                        />

                        <label>Age: </label>
                        <input type="text" 
                            required
                            className="form-control"
                            value={this.state.age}
                            onChange={this.onChangeAge}
                        />
                        
                        <label>Email: </label>
                        <input  type="email"
                                required
                                className="form-control"
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                        />

                        <label>Password: </label>
                        <input  type="password"
                                required
                                className="form-control"
                                value={this.state.password_user}
                                onChange={this.onChangepassword_user}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Register" className="btn btn-dark"/>
                    </div>
                </form>
            </div>
        )
    }
}

export default NewUserForm;