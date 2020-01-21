import React, { Component } from 'react';
import axios from 'axios';

import Username from './Login/Username';
import Password from './Login/Password';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                username: "",
                password: ""
            },
            step: 1,
        }
    }

    nextStep = () => {
        this.setState({
            step: this.state.step + 1
        });
    }

    prevStep = () => {
        this.setState({
            step: this.state.step - 1
        });
    }

    handleChange = e => {
        this.setState({
            ...this.state,
            data: {
                ...this.state.data,
                [e.target.name]: e.target.value
            }
        })
    }

    componentDidMount() {
        if (localStorage.getItem('token')) {
            this.props.history.push("/addressbook");
        }
    }

    handleLogin = (e) => {
        e.preventDefault();
        axios({
            method: "post",
            url: `http://localhost:3001/api/login`,
            data: this.state.data
        })
            .then(e => {
                localStorage.setItem('token', e.data.token);
            })
            .then(e => window.location.href = "#/addressbook")
            .catch(e => console.log(e))
    }

    useState

    render() {
        const { step } = this.state;
        switch (step) {
            case 1:
                return (
                    <Username
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                    />
                )
            case 2:
                return (
                    <Password
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        handleLogin={this.handleLogin}
                    />
                )
            default:
                break;
        }
    }
}
