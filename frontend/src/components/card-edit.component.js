import React, { Component } from "react";
import { CardService } from "../services/card.service";

export default class CardEdit extends Component {
  constructor(props) {
    super(props);
    this.onChangeCardname = this.onChangeCardname.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);

    this.getCard = this.getCard.bind(this);
    this.updateCard = this.updateCard.bind(this);
    this.deleteCard = this.deleteCard.bind(this);

    this.state = {
      currentCard: {
        id: null,
        title: "",
        email: "",
        role: null
      },
      actualCard: {
        id: null,
        title: "",
        email: "",
        role: null
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getCard(this.props.match.params.id);
  }

  onChangeCardname(e) {
    const title = e.target.value;
    this.setState(prevState => ({
      currentCard: {
        ...prevState.currentCard,
        title: title
      }
    }));
  }

  onChangeContent(e) {
    const content = e.target.value;
    this.setState(prevState => ({
      currentCard: {
        ...prevState.currentCard,
        content: content
      }
    }));
  }

  onChangeRole(e) {
    const role = e.target.value;
    this.setState(prevState => ({
      currentCard: {
        ...prevState.currentCard,
        role: role
      }
    }));
  }

  getCard(id) {
    CardService.getCard(id)
      .then(response => {
        this.setState({
          currentCard: response.data,
          actualCard: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateCard() {
    var data = {};
   if(this.state.currentCard.title != this.state.actualCard.title){
      data.title = this.state.currentCard.title;
   }
    if(this.state.currentCard.content != this.state.actualCard.content){
      data.content = this.state.currentCard.content;
   }
   if(this.state.currentCard.role != this.state.actualCard.role){
      data.role = this.state.currentCard.role;
   }

    CardService.updateCard(this.state.currentCard.id, data)
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "Card was updated successfully."
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteCard() {    
    CardService.deleteCard(this.state.currentCard.id)
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "Card was deleted successfully."
        });
        //this.props.history.push('/cards')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentCard } = this.state;

    return (
      <div>
        {currentCard ? (
          <div className="edit-form">
            <h4>Card</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentCard.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="difficulty">Content</label>
                <input
                  type="text"
                  className="form-control"
                  id="content"
                  value={currentCard.content}
                  onChange={this.onChangeContent}
                />
              </div>
              { }
              <div className="form-group">
                <label htmlFor="role">Difficulty</label>
                <div onChange={this.onChanngeDifficulty}>
                  <input
                    type="radio"
                    value="beginner"
                    name="difficulty"
                    checked={currentCard.role === 'beginner'}
                  /> Beginner
                  <input
                    type="radio"
                    value="easy"
                    name="difficulty"
                    checked={currentCard.role === 'easy'}
                  /> Easy
                  <input 
                    type="radio" 
                    value="medium" 
                    name="difficulty" 
                    checked={currentCard.role === 'medium'}
                    style={{ marginLeft: '1rem' }}
                  /> Medium
                  <input 
                    type="radio" 
                    value="hard" 
                    name="difficulty"
                    checked={currentCard.role === 'hard'}
                    style={{ marginLeft: '1rem' }}
                  /> Hard
                  <input 
                    type="radio" 
                    value="expert" 
                    name="difficulty"
                    checked={currentCard.role === 'expert'}
                    style={{ marginLeft: '1rem' }}
                  /> Expert
                  <input 
                    type="radio" 
                    value="n/a" 
                    name="difficulty"
                    checked={currentCard.role === 'n/a'}
                    style={{ marginLeft: '1rem' }}
                  /> N/A
                </div>
              </div>
            </form>

            <button
              type="button"
              className="badge badge-danger mr-2"
              onClick={this.deleteCard}
            >
              Delete
            </button>

            <button
              type="button"
              className="badge badge-success"
              onClick={this.updateCard}
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
