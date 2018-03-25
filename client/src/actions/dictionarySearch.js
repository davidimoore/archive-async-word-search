import { getRequest } from 'api/request';
import * as actionTypes from 'constants/actionTypes/dictionarySearch';

export function fetchWord(word) {
  return dispatch => {
    dispatch(requestDefinition());

    return getRequest(
      { url: `http://localhost:5000/api/websterDictionary/${word}`}
    ).then(response => {
        dispatch(receiveDefinion(response.data))
      })
      .catch(error => {
        dispatch(failedDctionarySearch(error))
      })
  }
}

function requestDefinition() {
  return {
    type: actionTypes.REQUEST_DICTIONARY_SEARCH
  }
}

function receiveDefinion(data) {
  return {
    data,
    type: actionTypes.RECEIVE_DICTIONARY_SEARCH
  }
}

function failedDctionarySearch(data) {
  return {
    data,
    type: actionTypes.FAILED_DICTIONARY_SEARCH

  }
}
