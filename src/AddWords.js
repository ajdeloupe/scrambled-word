import React, { Component } from 'react';
import './App.css';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class AddWords extends Component  {
    constructor(props) {
        super(props);
        //use state to track the words as they get added
        this.state = {
            newWords: [],
            tempWord: ''
        }
    }
    //update the state here. Match the id of the field(s) to the properties in state
    onFieldChange (event) {
        this.setState({
            [event.target.id]: event.target.value
        })
    }
    //prevent form from reloading browser
    handleSubmit(event){
        event.preventDefault();
        //send the newWords array to the onSubmitWords function
        this.props.onSubmitWords(this.state.newWords)
    }
    //when you click the + button
    addWord () {
        this.setState((prevState) => {
            return {
                //add word to newWords array and then clear word.
                newWords: prevState.newWords.concat(prevState.tempWord),
                tempWord:''
            }
        })
    }
    render() { return <div>
            <div className ="App-header">
                <h1>Add Words</h1>
            </div>
            <div className="Add-words">
                <form onSubmit={this.handleSubmit.bind(this)}>
                    
                    <p>Words: <span>{this.state.newWords.join(', ')}</span></p>
                    <label htmlFor="tempWord">Add Word:</label><br />
                    <input type="text" id="tempWord" value={this.state.tempWord} onChange={this.onFieldChange.bind(this)} /><input type = "button" value="+" onClick={this.addWord.bind(this)} /><br />
                    <input type="submit" value="Add" />
                </form>
            </div>
        </div>}
}

function mapDispatchToProps(dispatch, props){
    return {
        onSubmitWords: (newWords) => {
            dispatch({type: 'ADD_WORDS', newWords});
            props.history.push('/');
        }
    }
}
export default withRouter(connect(() => {return{}}, mapDispatchToProps)(AddWords));