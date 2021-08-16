import React, { Component } from "react";
import { AuthService } from "../services/auth.service";
import { styles } from "../styles/styles"

export default class Logout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
        };
    }

    logout() {
        AuthService.logout()
    }

    render() {
        return (
            <div>
                { AuthService.isLoggedIn() ? (
                        <div>
                        {this.state.errorMsg &&
                            <h4 style={styles.ErrorText}>{this.state.errorMsg}</h4>
                        }
                        <h4>Are you sure you want to log out?</h4>
                        <button type="button" onClick={this.logout} className="btn btn-success">
                            Log out
                        </button>
                    </div>
                ) : (
                    <div>
                        <h4>Successfully logged out.</h4>
                    </div>
                )}
            </div>
        );
    }
}