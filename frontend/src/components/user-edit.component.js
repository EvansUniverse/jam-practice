import React, { Component } from "react";
import { AdminService } from "../services/admin.service";

export default class UserEdit extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);

    this.getUser = this.getUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);

    this.state = {
      currentUser: {
        id: null,
        username: "",
        email: "",
        role: null
      },
      actualUser: {
        id: null,
        username: "",
        email: "",
        role: null
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getUser(this.props.match.params.id);
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

  onChangeRole(e) {
    const role = e.target.value;
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        role: role
      }
    }));
  }

  getUser(id) {
    AdminService.getUser(id)
      .then(response => {
        this.setState({
          currentUser: response.data,
          actualUser: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateUser() {
    var data = {};
   if(this.state.currentUser.username != this.state.actualUser.username){
      data.username = this.state.currentUser.username;
   }
    if(this.state.currentUser.email != this.state.actualUser.email){
      data.email = this.state.currentUser.email;
   }
   if(this.state.currentUser.role != this.state.actualUser.role){
      data.role = this.state.currentUser.role;
   }

    AdminService.updateUser(this.state.currentUser.id, data)
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "User was updated successfully."
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteUser() {    
    AdminService.deleteUser(this.state.currentUser.id)
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "User was deleted successfully."
        });
        //this.props.history.push('/users')
      })
      .catch(e => {
        console.log(e);
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
              </div>
              { }
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <div onChange={this.onChangeRole}>
                  <input
                    type="radio"
                    value="admin"
                    name="role"
                    checked={currentUser.role === 'admin'}
                  /> Admin
                  <input 
                    type="radio" 
                    value="moderator" 
                    name="role" 
                    checked={currentUser.role === 'moderator'}
                    style={{ marginLeft: '1rem' }}
                  /> Moderator
                  <input 
                    type="radio" 
                    value="user" 
                    name="role" 
                    checked={currentUser.role === 'user'}
                    style={{ marginLeft: '1rem' }}
                  /> User
                </div>
              </div>
            </form>

            <button
              type="button"
              className="badge badge-danger mr-2"
              onClick={this.deleteUser}
            >
              Delete
            </button>

            <button
              type="button"
              className="badge badge-success"
              onClick={this.updateUser}
            >
              Update
            </button>
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
