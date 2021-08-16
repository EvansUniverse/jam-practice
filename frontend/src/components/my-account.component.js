import React, { Component } from "react";
import { UserService } from "../services/user.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eyeIcon = <FontAwesomeIcon icon={faEye} />;

export default class MyAccount extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.toggleShowPassword = this.toggleShowPassword.bind(this);

        this.getUser = this.getUser.bind(this);
        this.updateUsername = this.updateUsername.bind(this);
        this.updateEmail = this.updateEmail.bind(this);
        this.updatePassword = this.updatePassword.bind(this);

        this.state = {
            currentUser: {
                id: null,
                username: "",
                email: "",
            },
            actualUser: {
                id: null,
                username: "",
                email: ""
            },
            password: "",
            message: "",
            showPassword: false
        };
    }

    componentDidMount() {
        this.getUser();
    }

    onChangeUsername(e) {
        const username = e.target.value;
        this.setState(prevState => ({
        currentUser: {
            ...prevState.currentUser,
            username: username
        }
        }));
    }

    onChangeEmail(e) {
        const email = e.target.value;
        this.setState(prevState => ({
        currentUser: {
            ...prevState.currentUser,
            email: email
        }
        }));
    }

    onChangePassword(e) {
        const password = e.target.value;
        this.setState(prevState => ({
            password: password
        }));
    }

    getUser() {
        UserService.get()
        .then(response => {
            this.setState({
                currentUser: response.data,
                actualUser: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            this.setState({
                message: e
            });
            console.log(e);
        });
    }

    updateUsername() {
        if(this.state.currentUser.username != this.state.actualUser.username){
            UserService.update({ username: this.state.currentUser.username })
            .then(response => {
                console.log(response.data);
                this.setState({
                    currentUser: response.data,
                    actualUser: response.data,
                    message: "Username was updated successfully."
                });
            })
            .catch(e => {
                console.log(e);
            });
        }
    }

    updateEmail() {
        if(this.state.currentUser.email != this.state.actualUser.email){
            UserService.update({ email: this.state.currentUser.email})
            .then(response => {
                console.log(response.data);
                this.setState({
                    currentUser: response.data,
                    actualUser: response.data,
                    message: "Email was updated successfully."
                });
            })
            .catch(e => {
                console.log(e);
            });
        }
    }

    updatePassword() {
        UserService.update({ password: this.state.password})
        .then(response => {
            console.log(response.data);
            this.setState({
                currentUser: response.data,
                actualUser: response.data,
                message: "Password was updated successfully."
            });
        })
        .catch(e => {
            console.log("error updating password");
            console.log(e);
        });
    }

    toggleShowPassword() {
        this.setState({
            showPassword: !this.state.showPassword
        });
    }



  render() {
    const { currentUser } = this.state;

    return (
      <div>
        {currentUser ? (
          <div className="edit-form">
            <h4>User</h4>
            <form>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={currentUser.username}
                  onChange={this.onChangeUsername}
                />
                <button
                    type="button"
                    className="badge badge-danger mr-2"
                    onClick={this.updateUsername}
                    >
                    Change Username
                </button>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  value={currentUser.email}
                  onChange={this.onChangeEmail}
                />
                <button
                    type="button"
                    className="badge badge-danger mr-2"
                    onClick={this.updateEmail}
                    >
                    Change Email
                </button>
              </div>
              <div className="form-group">
                <label htmlFor="password" style={{ marginRight: '1rem' }}> Password </label>
                <i onClick={this.toggleShowPassword}>{eyeIcon}</i>
                <input
                  type={this.state.showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                />
                <button
                    type="button"
                    className="badge badge-danger mr-2"
                    onClick={this.updatePassword}
                    >
                    Change Password
                </button>
              </div>   
            </form>

            <p>Role: {currentUser.role}</p>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>You are not logged in.</p>
          </div>
        )}
      </div>
    );
  }
}
