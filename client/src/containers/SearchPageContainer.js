import React, { Component } from 'react';
import SearchPage from 'components/SearchPage/SearchPage';
import { connect } from "react-redux";
import * as actionCreators from 'actions/dictionarySearch';

export class SearchPageContainer extends Component {
  render() {
    return <SearchPage { ...this.props }/>
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, actionCreators)(SearchPageContainer);
