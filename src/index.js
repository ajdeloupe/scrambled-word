import React from 'react';
import ReactDOM from 'react-dom';
import {sample} from 'underscore';
import './index.css';
import ScrambledWord from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import AddWords from './AddWords';

let words = ['hello', 'goodbye', 'tomorrow', 'whatever', 'broccoli', 'sandpaper', 'eagle', 'cactus']

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
function App () {
    return <ScrambledWord {...state} onNewGame={onNewGame} onAnswerComplete={onAnswerComplete} />
}
const Form = withRouter (({history}) => 
     <AddWords onSubmitWords={(newWords) => {
        words.push(...newWords);
        history.push('/');
    }} />
)
function onSubmitWords (newWords) {
   
    render();
}
function render() {
    
    ReactDOM.render(
    <BrowserRouter>
        <>
            <Route exact path="/" component={App} />
            <Route path="/add" component={Form} />
        </>
    </BrowserRouter>, document.getElementById('root'));
}
render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
