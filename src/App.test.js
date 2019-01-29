import React from 'react';
import ReactDOM from 'react-dom';
import ScrambledWord from './App';
import {sample} from 'underscore';

let words = ['hello', 'goodbye', 'tomorrow', 'whatever', 'confusion', 'cerebral', 'cauliflower', 'broccoli', 'sandpaper', 'eagle', 'grandfather', 'cactus', 'groceries', 'development']

let state = {
    words: words,
    currentWord: sample(words),
    answer: ''
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ScrambledWord {...state} onNewGame={() => {}} onAnswerComplete={() => {}} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

