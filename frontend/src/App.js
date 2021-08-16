import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Switch, Route, Link } from "react-router-dom";
import "./App.css";

import Register from "./components/register.component";
import Logout from "./components/logout.component";
import Login from "./components/login.component";
import UserList from "./components/user-list.component.js";
import UserEdit from "./components/user-edit.component";
import MyAccount from "./components/my-account.component";

import { AuthService } from "./services/auth.service";
import { PrivateRoute } from './components/PrivateRoute';
import http from "./http-common";


class App extends Component {
  constructor(props) {
    super(props);
    this.getUsername= this.getUsername.bind(this);

    this.state = {
      currentUser: "Guest"
    };
  }

  componentDidMount() {
    AuthService.currentUser.subscribe(x => this.setState({ currentUser: x }));
  }


  getUsername() {
    return AuthService.getUsername();
  }

  render() {
    const { currentUser } = this.state;
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">  
          <a href="/" className="navbar-brand">
           { this.getUsername() }
          </a>
          <div className="navbar-nav mr-auto">
            { AuthService.isAdmin() &&
              <li className="nav-item">
                <Link to={"/admin/users"} className="nav-link">
                  Users
                </Link>
              </li> }
            { !AuthService.isLoggedIn() &&
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li> }
            { !AuthService.isLoggedIn() &&
              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Register
                </Link>
              </li> }
            { AuthService.isLoggedIn() &&
              <li className={"nav-item"}>
                <Link to={"/myaccount"} className="nav-link">
                  My Account
                </Link>
              </li> }
            { AuthService.isLoggedIn() &&
              <li className={"nav-item"}>
                <Link to={"/logout"} className="nav-link">
                  Logout
                </Link>
              </li> }
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <PrivateRoute exact path="/admin/users" component={UserList} />
            <PrivateRoute path="/admin/users/:id" component={UserEdit} />

            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/myaccount" component={MyAccount} />
            <Route exact path="/logout" component={Logout} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;

// If debug mode is enabled, log detailed information about each http
// request and response the app handles.
const REACT_APP_DEV_DEBUG_MODE = process.env.REACT_APP_DEV_DEBUG_MODE || "false"
if (REACT_APP_DEV_DEBUG_MODE == "true"){
  http.interceptors.request.use(request => {
    console.log('Starting Request', JSON.stringify(request, null, 2))
    return request
  })

  http.interceptors.response.use(response => {
    console.log('Response:', JSON.stringify(response, null, 2))
    return response
  })
}