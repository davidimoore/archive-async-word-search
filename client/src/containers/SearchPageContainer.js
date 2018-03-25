import React, { Component } from 'react';
import SearchPage from 'components/SearchPage';
import { connect } from "react-redux";
import * as actionCreators from 'actions/dictionarySearch';

export class SearchPageContainer extends Component {


  render() {
    const { fetchWord } = this.props;
    return <SearchPage submitHandler={ fetchWord }/>
  }
}

function mapStateToProps(state) {
  return state.dictionarySearch;
}

export default connect(mapStateToProps, actionCreators)(SearchPageContainer);
