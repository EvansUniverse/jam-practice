import React, { Component } from "react";
import { CardService } from "../services/card.service";
import { Link } from "react-router-dom";
import { styles } from "../styles/styles"
import Pagination from "@material-ui/lab/Pagination";

export default class CardList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchCriteria = this.onChangeSearchCriteria.bind(this);
        this.retrieveCards = this.retrieveCards.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveCard = this.setActiveCard.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
    
        this.state = {
          cards: [],
          currentCard: null,
          currentIndex: -1,
          searchCriteria: "",
          
          page: 1,
          pages: 0,
          pageSize: 10
        };

        this.pageSizes = [10, 20, 50, 100]
      }
    
      componentDidMount() {
        this.retrieveCards();
      }
    
      onChangeSearchCriteria(e) {
        const searchCriteria = e.target.value;
    
        this.setState({
          searchCriteria: searchCriteria
        });
      }
    
      //TODO
      retrieveCards() {
        const { searchCriteria, page, pageSize } = this.state;
        const params = this.getRequestParams(searchCriteria, page, pageSize);

        CardService.getCards(params) //TODO
          .then(response => {
            const { items, totalPages } = response.data

            this.setState({
              cards: items,
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
            this.retrieveCards();
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
            this.retrieveCards();
          }
        );
      }
    
      refreshList() {
        this.retrieveCards();
        this.setState({
          currentCard: null,
          currentIndex: -1
        });
      }
    
      setActiveCard(card, index) {
        this.setState({
          currentCard: card,
          currentIndex: index
        });
      }

    render() {
        const {   
          searchCriteria, 
          cards,
          currentCard,
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
                  placeholder="Search by cardname"
                  value={this.searchCriteria}
                  onChange={this.onChangeSearchCriteria}
                />
                <div className="input-group-append">
                  <button 
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={this.retrieveCards}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <h4>Cards List</h4>
              <Link to="/cards/create" className="btn btn-primary">Create New Card</Link>
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
                {cards &&
                  cards.map((card, index) => (
                    <li
                      className={
                        "list-group-item " +
                        (index === currentIndex ? "active" : "")
                      }
                      onClick={() => this.setActiveCard(card, index)}
                      key={index}
                    >
                      {card.title}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="col-md-6">
              {currentCard ? (
                <div>
                  <h4>Card</h4>
                  <div>
                    <label>
                      <strong>Title:</strong>
                    </label>{" "}
                    {currentCard.title}
                  </div>
                  <div>
                    <label>
                      <strong>Difficulty:</strong>
                    </label>{" "}
                    {currentCard.difficulty}
                  </div>
                  <div>
                    <label>
                      <strong>Content:</strong>
                    </label>{" "}
                    {currentCard.content}
                  </div>
                  <div>
                    <label>
                      <strong>Public:</strong>
                    </label>{" "}
                    {currentCard.ispublic}
                  </div>
    
                  <Link //TODO
                    to={"cards/" + currentCard.id}
                    className="badge badge-warning"
                  >
                    Edit
                  </Link>
                </div>
              ) : (
                <div>
                  <br />
                  <p>Please click on a Card...</p>
                </div>
              )}
            </div>
          </div>
        );
    }
}