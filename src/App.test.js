import React from 'react';
import ReactDOM from 'react-dom';
import ScrambledWord from './App';
import {sample} from 'underscore';
import Enzyme, {mount, shallow, render} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({adapter: new Adapter()});

let words = ['hello', 'goodbye', 'tomorrow', 'whatever', 'confusion', 'cerebral', 'cauliflower', 'broccoli', 'sandpaper', 'eagle', 'grandfather', 'cactus', 'groceries', 'development']

let state = {
    words: words,
    currentWord: sample(words),
    answer: ''
}
describe("Testing Scrambled Word Game", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ScrambledWord {...state} onNewGame={() => {}} onAnswerComplete={() => {}} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  describe("when no answer has been submitted", ()=>{
    let wrapper;
    //beforeAll is a function to set up the scenario
    beforeAll(()=>{
      //mount is an enzyme function
      wrapper= mount(<ScrambledWord {...state} onNewGame={() => {}} onAnswerComplete={() => {}} />);
    });
    it("should have no background color", ()=>{
      expect(wrapper.find('input.gameInput').props().style.backgroundColor).toBe(undefined);
    })
  });
  describe("when the wrong answer has been submitted", ()=>{
    let wrapper;
    beforeAll(()=>{
      wrapper= mount(<ScrambledWord {...(Object.assign({}, state, {answer: 'wrong'}))} onNewGame={() => {}} onAnswerComplete={() => {}} />);
    });
    it("should have red background color", ()=>{
      expect(wrapper.find('input.gameInput').props().style.backgroundColor).toBe('red');
    })
  });
  describe("when the correct answer has been submitted", ()=>{
    let wrapper;
    beforeAll(()=>{
      wrapper= mount(<ScrambledWord {...(Object.assign({}, state, {answer: 'correct'}))} onNewGame={() => {}} onAnswerComplete={() => {}} />);
    });
    it("should have green background color", ()=>{
      expect(wrapper.find('input.gameInput').props().style.backgroundColor).toBe('green');
    })
  });
});