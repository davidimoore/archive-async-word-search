import React, { Component } from 'react';
import './App.css';
import SearchPageContainer from 'containers/SearchPageContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Word Lookup</h1>
        </header>
        <div>
          <SearchPageContainer/>
        </div>
      </div>
    );
  }
}

export default App;
