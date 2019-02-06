import React, { Component } from 'react';
import './App.css';
import {connect} from 'react-redux';
import {shuffle} from 'underscore';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

//using a Class component here because we want to use local state to hold the current state of the game.  This is a stateful component
class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWord:this.props.word,
      currentWordArray: shuffle(this.props.word.split('')),
      currentAnswer: [],
      highlight: this.props.answer
    }
  }
  
  
  handleClick(letter) {
    //assign the state to a new array so we don't modify it directly
    let prevAnswer = [...this.state.currentAnswer];
    let prevLetters = [...this.state.currentWordArray];
    //get the array index of the letter that was clicked
    let letterIndex = prevLetters.indexOf(letter);
    //only need to check the answer if we might need to clear an answer or if all the letters will be used
    if(this.props.answer !== "" || prevLetters.length === 1) {
    //check the new answer to see if it is correct
      this.props.onAnswerComplete(prevAnswer.concat(letter).join('')); 
    }
    //set the state 
    this.setState((prevState, props) => {
     //Splice out the extra item here
     prevState.currentWordArray.splice(letterIndex, 1);
      return { 
        //remove the letter from the array, can use filter here directly or modify the array elsewhere with splice and then put the updated array here.
        //currentWordArray: prevState.currentWordArray.filter((letter, index) => index !== letterIndex),
        currentWordArray: prevState.currentWordArray,
        //add the letter to the answer array using concat so it returns the new array
        currentAnswer:  prevState.currentAnswer.concat(letter),
        //reset the highlight in case the answer check changed it.
        highlignt: props.answer

      }
    });
  }
  onUndo() {
    //assign the state to a new array so we don't modify it directly
    let prevAnswer = [...this.state.currentAnswer];

    //dont continue to undo if there is nothing left
    if(prevAnswer.length === 0) return;
    
    //get last letter to be added off the answer array and save it
    let letter = prevAnswer[prevAnswer.length - 1];
    
    //if the answer was already checked then we need to re-check it to clear the highlight
    if(this.props.answer !== "") {
      this.props.onAnswerComplete(prevAnswer.slice(0,-1).join(''));
    }

    //reset state
    //push returns the new length of the array. Thus push does not work here. Concat returns new array.
    //slice returns the selected elements in the array as a new array.  Splice returns the removed items
    this.setState((prevState, props) => {
      return {
        currentWordArray: prevState.currentWordArray.concat(letter),
        currentAnswer: prevState.currentAnswer.slice(0,-1),
        highlight: props.answer
      }
    });
  }
  highlightToBorderColor() {
    let mapping = {
      'correct': 'green',
      'wrong': 'red',
      'none': ''
    }
    return mapping[this.state.highlight];
  }

  render() {
    
    return (
    <div className="game"  >
      <div>
        <input type="text" style={{backgroundColor: this.highlightToBorderColor()}} className="gameInput" value={this.state.currentAnswer.join('')} readOnly  />
        <input type="button" className="undo" value="&larr;" onClick={this.onUndo.bind(this)} />
      </div>
      <Letters word={this.state.currentWordArray} handleClick={this.handleClick.bind(this)} />
    </div>
    );
  }
  //to update the local state if the word prop has changed (New Game triggered)
  componentDidUpdate(){
    
     if(this.state.currentWord !== this.props.word) {
      
      this.setState({
        currentWord: this.props.word,
        currentWordArray: shuffle(this.props.word.split('')),
        currentAnswer: []
      });
      
    }
    if(this.state.highlight !== this.props.answer){
      this.setState({
        highlight: this.props.answer
      })
    } 
    
  }
}
Game.propTypes = {
  word: PropTypes.string.isRequired,
  answer: PropTypes.string,
  onAnswerComplete: PropTypes.func.isRequired
  
}
function Letters({word, handleClick}){

  return word.map((letter, index) => <span key={index} className="letter" onClick={() => handleClick(letter)}>{letter}</span>)

}
Letters.propTypes = {
  word: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleClick: PropTypes.func.isRequired
}
function NewGameBtn ({onNewGame}) {
  return <input type="button" value="New Game" onClick={onNewGame} />
}
function mapStateToProps(state) {
  return {
    currentWord: state.currentWord,
    answer: state.answer
  }
}
function mapDispatchToProps(dispatch ) {
  return {
    onNewGame: () => {
      dispatch({type: 'CONTINUE'})
    },
    onAnswerComplete: (answer) => {
      dispatch({type: 'ANSWER_SELECTED', answer })
    }
  }
}
const ScrambledWord = connect(mapStateToProps, mapDispatchToProps)(function({ currentWord, answer, onNewGame, onAnswerComplete}) {
  
  return <div className="App">
    <header className="App-header">
    <h1>Scrambled Word Game</h1>
    <p>Click on the letters in order to unscramble the word.</p>
    </header>
    <Game word={currentWord} answer={answer} onAnswerComplete={onAnswerComplete} />
    <NewGameBtn onNewGame={onNewGame} />
    <p><Link to="/add">Add words to game</Link></p>
    <footer><p>Game by Adriane</p></footer>
  </div>
})
ScrambledWord.propTypes = {
  word: PropTypes.arrayOf(PropTypes.string),
  currentWord: PropTypes.string.isRequired,
  answer: PropTypes.string,
  onNewGame: PropTypes.func.isRequired,
  onAnswerComplete: PropTypes.func.isRequired
}

export default ScrambledWord;
