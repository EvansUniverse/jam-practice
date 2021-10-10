import React, { Component } from "react";
import { CardService } from "../services/card.service";

export default class CardEdit extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);
    this.onChangeDifficulty = this.onChangeDifficulty.bind(this);
    this.onChangePublic = this.onChangePublic.bind(this);

    this.getCard = this.getCard.bind(this);
    this.updateCard = this.updateCard.bind(this);
    this.deleteCard = this.deleteCard.bind(this);

    this.state = {
      currentCard: {
        id: null,
        title: "",
        content: "",
        ispublic: null,
        difficulty: null
      },
      actualCard: {
        id: null,
        title: "",
        content: "",
        ispublic: null,
        difficulty: null
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getCard(this.props.match.params.id);
  }

  onChangeTitle(e) {
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

  onChangeDifficulty(e) {
    const difficulty = e.target.value;
    this.setState(prevState => ({
      currentCard: {
        ...prevState.currentCard,
        difficulty: difficulty
      }
    }));
  }

  onChangePublic(e) {
    const ispublic = (e.target.value === 'true');
    this.setState(prevState => ({
      currentCard: {
        ...prevState.currentCard,
        ispublic: ispublic
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
   if(this.state.currentCard.difficulty != this.state.actualCard.difficulty){
      data.difficulty = this.state.currentCard.difficulty;
   }
   if(this.state.currentCard.ispublic != this.state.actualCard.ispublic){
    data.ispublic = this.state.currentCard.ispublic;
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
              <div className="form-group">
                <label htmlFor="difficulty">Difficulty</label>
                <div onChange={this.onChangeDifficulty}>
                  <input
                    type="radio"
                    value="beginner"
                    name="difficulty"
                    checked={currentCard.difficulty === 'beginner'}
                  /> Beginner
                  <input
                    type="radio"
                    value="easy"
                    name="difficulty"
                    checked={currentCard.difficulty === 'easy'}
                  /> Easy
                  <input 
                    type="radio" 
                    value="medium" 
                    name="difficulty" 
                    checked={currentCard.difficulty === 'medium'}
                    style={{ marginLeft: '1rem' }}
                  /> Medium
                  <input 
                    type="radio" 
                    value="hard" 
                    name="difficulty"
                    checked={currentCard.difficulty === 'hard'}
                    style={{ marginLeft: '1rem' }}
                  /> Hard
                  <input 
                    type="radio" 
                    value="expert" 
                    name="difficulty"
                    checked={currentCard.difficulty === 'expert'}
                    style={{ marginLeft: '1rem' }}
                  /> Expert
                  <input 
                    type="radio" 
                    value="n/a" 
                    name="difficulty"
                    checked={currentCard.difficulty === 'n/a'}
                    style={{ marginLeft: '1rem' }}
                  /> N/A
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="ispublic">Public</label>
                <div onChange={this.onChangePublic}>
                  <input
                    type="radio"
                    value='false'
                    name="ispublic"
                    checked={currentCard.ispublic === false}
                  /> No
                  <input
                    type="radio"
                    value='true'
                    name="ispublic"
                    checked={currentCard.ispublic === true}
                  /> Yes
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
