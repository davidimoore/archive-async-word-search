import React, { Component } from 'react';
import './TextForm.css';

export default class TextForm extends Component {
  state = { words: "" };

  handleChange = (event) => {
    this.setState({ words: event.target.value })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { submitHandler } = this.props;
    const { words } = this.state;
    submitHandler(words)
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
            value={ this.state.words }
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
