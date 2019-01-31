import React, { Component } from 'react';
import './App.css';

class AddWords extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            newWords: [],
            tempWord: ''
        }
    }
    onFieldChange (event) {
        this.setState({
            [event.target.id]: event.target.value
        })
    }
    handleSubmit(event){
        event.preventDefault();
        this.props.onSubmitWords(this.state.newWords)
    }
    addWord () {
        this.setState((prevState) => {
            return {
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

export default AddWords;