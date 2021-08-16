import React, { Component } from "react";
import { AdminService } from "../services/admin.service";
import { Link } from "react-router-dom";
import { styles } from "../styles/styles"
import Pagination from "@material-ui/lab/Pagination";

export default class UserList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchCriteria = this.onChangeSearchCriteria.bind(this);
        this.retrieveUsers = this.retrieveUsers.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveUser = this.setActiveUser.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
    
        this.state = {
          users: [],
          currentUser: null,
          currentIndex: -1,
          searchCriteria: "",
          
          page: 1,
          pages: 0,
          pageSize: 10
        };

        this.pageSizes = [10, 20, 50, 100]
      }
    
      componentDidMount() {
        this.retrieveUsers();
      }
    
      onChangeSearchCriteria(e) {
        const searchCriteria = e.target.value;
    
        this.setState({
          searchCriteria: searchCriteria
        });
      }
    
      retrieveUsers() {
        const { searchCriteria, page, pageSize } = this.state;
        const params = this.getRequestParams(searchCriteria, page, pageSize);

        AdminService.getUsers(params)
          .then(response => {
            const { items, totalPages } = response.data

            this.setState({
              users: items,
              pages: totalPages,
            });
          })
          .catch(e => {
            console.log(e);
          });
      }

      getRequestParams(searchCriteria, page, pageSize) {
        let params = {};
    
        if (searchCriteria) {
          params["criteria"] = searchCriteria;
        }
    
        if (page) {
          params["page"] = page - 1;
        }
    
        if (pageSize) {
          params["size"] = pageSize;
        }
    
        return params;
      }


      handlePageChange(event, value) {
        this.setState(
          {
            page: value,
          },
          () => {
            this.retrieveUsers();
          }
        );
      }

      handlePageSizeChange(event) {
        this.setState(
          {
            pageSize: event.target.value,
            page: 1
          },
          () => {
            this.retrieveUsers();
          }
        );
      }
    
      refreshList() {
        this.retrieveUsers();
        this.setState({
          currentUser: null,
          currentIndex: -1
        });
      }
    
      setActiveUser(user, index) {
        this.setState({
          currentUser: user,
          currentIndex: index
        });
      }

    render() {
        const {   
          searchCriteria, 
          users,
          currentUser,
          currentIndex,
          pages, 
          page, 
          pageSize
        } = this.state;

        return (
          <div className="list row">
            <div className="col-md-8">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by username"
                  value={this.searchCriteria}
                  onChange={this.onChangeSearchCriteria}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={this.retrieveUsers}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <h4>Users List</h4>



              <div className="mt-3">
                {"Items per Page: "}
                <select onChange={this.handlePageSizeChange} value={pageSize}>
                  {this.pageSizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                <Pagination
                  className="my-3"
                  count={pages}
                  page={page}
                  siblingCount={1}
                  boundaryCount={1}
                  variant="outlined"
                  shape="rounded"
                  onChange={this.handlePageChange}
                />
              </div>

              <ul className="list-group">
                {users &&
                  users.map((user, index) => (
                    <li
                      className={
                        "list-group-item " +
                        (index === currentIndex ? "active" : "")
                      }
                      onClick={() => this.setActiveUser(user, index)}
                      key={index}
                    >
                      {user.username}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="col-md-6">
              {currentUser ? (
                <div>
                  <h4>User</h4>
                  <div>
                    <label>
                      <strong>username:</strong>
                    </label>{" "}
                    {currentUser.username}
                  </div>
                  <div>
                    <label>
                      <strong>ID:</strong>
                    </label>{" "}
                    {currentUser.id}
                  </div>
                  <div>
                    <label>
                      <strong>email:</strong>
                    </label>{" "}
                    {currentUser.email}
                  </div>
                  <div>
                    <label>
                      <strong>role:</strong>
                    </label>{" "}
                    {currentUser.role}
                  </div>
    
                  <Link
                    to={"/admin/users/" + currentUser.id}
                    className="badge badge-warning"
                  >
                    Edit
                  </Link>
                </div>
              ) : (
                <div>
                  <br />
                  <p>Please click on a User...</p>
                </div>
              )}
            </div>
          </div>
        );
    }
}