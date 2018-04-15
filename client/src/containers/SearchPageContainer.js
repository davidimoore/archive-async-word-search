import React, { Component } from 'react';
import SearchPage from 'components/SearchPage';
import { connect } from "react-redux";
import * as actionCreators from 'actions/dictionarySearch';

export class SearchPageContainer extends Component {
  render() {
    console.log(this.props)
    return <SearchPage {...this.props}/>
  }
}

function mapStateToProps(state) {
  return state.dictionarySearch;
}

export default connect(mapStateToProps, actionCreators)(SearchPageContainer);
