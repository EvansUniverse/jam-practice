import React, { Component } from "react";
import { AuthService } from "../services/auth.service";
import { styles } from "../styles/styles"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eyeIcon = <FontAwesomeIcon icon={faEye} />;

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername= this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.toggleShowPassword = this.toggleShowPassword.bind(this);

        this.state = {
            id: null,
            username: "",
            password: "",
            authToken: "insert-auth-token-here",

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

    saveUser() {
        var data = {
            username: this.state.username,
            password: this.state.password,
        };

        let responseMsg;
        AuthService.login(data)
            .then(response => {
                responseMsg = response;
                this.setState({
                    id: response.data.id,
                    username: response.data.title,
                    password: response.data.password,
                    authToken: response.data.accessToken,

                    submitted: true,
                    errorMsg: null
                });
            })
            .catch(err => {
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
                        <h4>Logged in successfully.</h4>
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
                        <button type="button" onClick={this.saveUser} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
            </div>
        );
    }
}