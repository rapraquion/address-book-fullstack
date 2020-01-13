import React, { Component } from 'react';

import axios from 'axios';

import Username from './Login/Username';
import Password from './Login/Password';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                email: "",
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
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        axios({
            method: "post",
            url: `http://localhost:3001/api/register`,
            data: this.state.data
        })
            .then(e => {
                this.props.history.push("/addressbook")
            })
            .catch(e => console.log(e))
    }

    // handleLogin = (e) => {
    //     e.preventDefault();
    //     axios({
    //         method: "post",
    //         url: `http://localhost:4000/login`,
    //         data: this.state.data
    //     })
    //         .then(e => {
    //             localStorage.setItem('token', e.data.accessToken)
    //             this.props.history.push('/usermanager')

    //         })
    //         .catch(e => console.log(e))
    // }

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
                    // handleLogin={this.handleLogin}
                    />
                )
            default:
                break;
        }
    }
}
