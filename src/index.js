import React from 'react';
import ReactDOM from 'react-dom';
import {sample} from 'underscore';
import './index.css';
import ScrambledWord from './App';
import * as serviceWorker from './serviceWorker';

let words = ['hello', 'goodbye', 'tomorrow', 'whatever', 'confusion', 'cerebral', 'cauliflower', 'broccoli', 'sandpaper', 'eagle', 'grandfather', 'cactus', 'groceries', 'development']

let state = {
    words: words,
    currentWord: sample(words),
    answer: ''
}

function onNewGame( ) {
    
    state.currentWord = sample(state.words);
    state.answer = '';
    render();
}
function onAnswerComplete(answer) {
    let isCorrect = "";
    if( answer.length === state.currentWord.length) {
     isCorrect = answer === state.currentWord ? 'correct' : 'wrong';
    }
    state.answer = isCorrect;
    render();
}
function render() {
    
    ReactDOM.render(<ScrambledWord {...state} onNewGame={onNewGame} onAnswerComplete={onAnswerComplete} />, document.getElementById('root'));
}
render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
