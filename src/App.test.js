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
    currentWord: "hello",
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
  describe("when the user selects their first letter", ()=>{
    let wrapper;
    //set handleAnswerSelected to a jest dummy function so we can get information on what is passed to the function
    const handleAnswerSelected = jest.fn();
    beforeAll(()=>{
      wrapper= mount(<ScrambledWord {...state} onAnswerComplete={handleAnswerSelected} onNewGame={() => {}} />);
      //simulate a click event on the first book title
      wrapper.find('.letter').first().simulate('click');
      wrapper.find('.letter').first().simulate('click');
      wrapper.find('.letter').first().simulate('click');
      wrapper.find('.letter').first().simulate('click');
      wrapper.find('.letter').first().simulate('click');
    });
    it("should trigger checkAnswer", ()=>{
      //check if the function was called
      expect(handleAnswerSelected).toHaveBeenCalled();
    });
    it("should receive a string", ()=>{
      //check whether it was passed a string.
      expect(handleAnswerSelected).toHaveBeenCalledWith(expect.any(String));
    })
  })
});