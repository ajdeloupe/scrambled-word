import React from 'react';
import ReactDOM from 'react-dom';
import {sample} from 'underscore';
import './index.css';
import ScrambledWord from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route} from 'react-router-dom';
import AddWords from './AddWords';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';

let words = ['hello', 'goodbye', 'tomorrow', 'whatever', 'broccoli', 'sandpaper', 'eagle', 'cactus'];

/* let state = {
    words: words,
    currentWord: sample(words),
    answer: ''
} */
function reducer(state = {
    words,
    currentWord: sample(words),
    answer: ''
}, action ) {
    switch(action.type) {
        case 'ANSWER_SELECTED':
            let isCorrect = "";
            //if the answer is complete, check if it is correct
            if( action.answer.length === state.currentWord.length) {
            isCorrect =  action.answer === state.currentWord ? 'correct' : 'wrong';
            }
            //set answer to the resulting string
            return Object.assign({}, state, {answer: isCorrect});
        case 'CONTINUE':
            return Object.assign({}, state, {currentWord: sample(state.words), answer: ''});
        case 'ADD_WORDS':
            return Object.assign({}, state, {words: state.words.concat(...action.newWords)});
        default:
            return state;
    }
}
let store = Redux.createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
/* function onNewGame( ) {
    //sample a new word
    state.currentWord = sample(state.words);
    //reset answer
    state.answer = '';
    //re-render
    render();
}
function onAnswerComplete(answer) {
    //if answer isn't complete we want to reset the answer to an empty string
    let isCorrect = "";
    //if the answer is complete, check if it is correct
    if( answer.length === state.currentWord.length) {
     isCorrect = answer === state.currentWord ? 'correct' : 'wrong';
    }
    //set answer to the resulting string
    state.answer = isCorrect;
    //re-render
    render();
} */
//wrap the main app in a function so it can be used as a route (needed if there are props)
/* function App () {
    return  <ScrambledWord />
} */
/* function onSubmitWords (history, newWords) {
 //push the new words to the words array.  Use ... to spread the newWords array first, so each item is added to the array individually.
 words.push(...newWords);
 //redirect back to the root.
 history.push('/');
} */
//the prop in AddWords uses history so we have to wrap this in withRouter to make the history available.  



function render() {
    
    ReactDOM.render(
        //set up your routes here and wrap them in <BrowserRouter>
    <BrowserRouter>
        <ReactRedux.Provider store={store}>
        <>
            <Route exact path="/" component={ScrambledWord} />
            <Route path="/add" component={AddWords} />
        </>
        </ReactRedux.Provider>
    </BrowserRouter>, document.getElementById('root'));
}
render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
