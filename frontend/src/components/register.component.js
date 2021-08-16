import React, { Component } from "react";
import { styles } from "../styles/styles"
import { Switch, Route, Link } from "react-router-dom";
import { AuthService } from "../services/auth.service";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eyeIcon = <FontAwesomeIcon icon={faEye} />;

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.toggleShowPassword = this.toggleShowPassword.bind(this);

        this.state = {
            username: "",
            password: "",
            email: "",

            id: null,
            submitted: false,
            errorMsg: null,
            showPassword: false
        };
    }

    toggleShowPassword() {
        this.setState({
            showPassword: !this.state.showPassword
        });
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    saveUser() {
        var data = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        };

        let responseMsg;
        AuthService.register(data)
            .then(response => {
                responseMsg = response;
                this.setState({
                    id: response.data.id,
                    username: response.data.title,
                    password: response.data.password,
                    email: response.data.email,

                    submitted: true,
                    errorMsg: null
                })
                //console.log(response.data);
            }).catch(e => {
                this.setState({
                    errorMsg: responseMsg
                });
            });

    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>Account created successfully!</h4>
                    </div>
                ) : (
                        <div>
                            {this.state.errorMsg &&
                                <h4 style={styles.ErrorText}>{this.state.errorMsg}</h4>
                            }
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    required
                                    value={this.state.username}
                                    onChange={this.onChangeUsername}
                                    name="username"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" style={{ marginRight: '1rem' }} >Password</label>
                                <i onClick={this.toggleShowPassword}>{eyeIcon}</i>
                                <input
                                    type= {this.state.showPassword ? "text" : "password"}
                                    className="form-control"
                                    id="password"
                                    required
                                    value={this.state.password}
                                    onChange={this.onChangePassword}
                                    name="password"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    required
                                    value={this.state.email}
                                    onChange={this.onChangeEmail}
                                    name="email"
                                />
                            </div>

                            <button type="button" onClick={this.saveUser} className="btn btn-success">
                                Submit
                        </button>
                        </div>
                    )}
            </div>
        );
    }
}