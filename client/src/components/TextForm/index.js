import React, { Component } from 'react';
import './TextForm.css';

export default class TextForm extends Component {
  state = { word: "" };

  handleChange = (event) => {
    this.setState({ word: event.target.value })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { submitHandler } = this.props;
    const { word } = this.state;
    submitHandler(word)
  };

  render() {
    return (
      <div
        className={ `TextFormContainer` }
      >
        <form
          className={ `TextForm` }
        >
          <input
            className={ `WordTextInput` }
            type="text"
            name="words"
            value={ this.state.word }
            onChange={ this.handleChange }
          />

          <input
            className={ `Submit` }
            type="submit"
            value="Submit"
            onClick={ this.handleSubmit }
          />
        </form>
      </div>
    )
  }
}
