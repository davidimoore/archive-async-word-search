import { getRequest } from 'api/request';
import * as actionTypes from 'constants/actionTypes/dictionarySearch';
import * as urls from 'constants/urls'

export function fetchWord(word) {
  return dispatch => {
    dispatch(setWord(word));
    dispatch(requestOfficialDefinition());
    fetchOfficialWord(dispatch, word);
    dispatch(requestUrbanDictionaryDefinition());
    fetchUrbanDictionaryDefinition(dispatch, word);
  }
}

function setWord(word) {
  return {
    data: word,
    type: actionTypes.SET_WORD
  }
}

function fetchOfficialWord(dispatch, word){
  return getRequest({ url: `${urls.webstersSearchURL}/${word}` })
    .then(result => {
      dispatch(receiveOfficialDefinition(result.data))
    })
    .catch(error => dispatch(failedOfficialDictionarySearch(error)))
}

function fetchUrbanDictionaryDefinition(dispatch, word){
  return getRequest({ url: `${urls.urbanDictionarySearchUrl}?term=${word}` })
    .then(result => {
      dispatch(receiveUrbanDictionaryDefinion(result.data))
    })
    .catch(error => dispatch(failedUrbanDictionaryDictionarySearch(error)))
}

function requestOfficialDefinition() {
  return {
    type: actionTypes.REQUEST_OFFICIAL_DICTIONARY_SEARCH
  }
}

function receiveOfficialDefinition(data) {
  return {
    data,
    type: actionTypes.RECEIVE_OFFICIAL_DICTIONARY_SEARCH
  }
}

function failedOfficialDictionarySearch(data) {
  return {
    data,
    type: actionTypes.FAILED_OFFICIAL_DICTIONARY_SEARCH

  }
}

function requestUrbanDictionaryDefinition() {
  return {
    type: actionTypes.REQUEST_URBAN_DICTIONARY_SEARCH
  }
}

function receiveUrbanDictionaryDefinion(data) {
  return {
    data,
    type: actionTypes.RECEIVE_URBAN_DICTIONARY_SEARCH
  }
}

function failedUrbanDictionaryDictionarySearch(data) {
  return {
    data,
    type: actionTypes.FAILED_URBAN_DICTIONARY_SEARCH

  }
}
