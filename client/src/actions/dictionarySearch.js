import { getRequest } from 'api/request';
import * as actionTypes from 'constants/actionTypes/dictionarySearch';
import * as urls from 'constants/urls'

export function fetchWords(data) {
  const words = data.split(",");
  return dispatch => {
    words.map((word, index) => dispatch(fetchWord(word, index)))
  }
}

function fetchWord(word, index) {
  return dispatch => {
    dispatch(setWord({ id: index, word }));
    dispatch(requestOfficialDefinition({ id: index }));
    fetchOfficialWord({ dispatch, word, id: index });

    dispatch(requestUrbanDictionaryDefinition({ id: index }));
    fetchUrbanDictionaryDefinition({ dispatch, word, id: index });
  }
}

function setWord({ id, word }) {
  return {
    data: { id, word },
    type: actionTypes.SET_WORD
  }
}

function fetchOfficialWord({ dispatch, word, id }) {
  return getRequest({ url: `${urls.webstersSearchURL}/${word}` })
    .then(result => {
      dispatch(receiveOfficialDefinition({ result: result.data, id }))
    })
    .catch(error => dispatch(failedOfficialDictionarySearch(error)))
}

function fetchUrbanDictionaryDefinition({ dispatch, word, id }) {
  return getRequest({ url: `${urls.urbanDictionarySearchUrl}?term=${word}` })
    .then(result => {

      dispatch(receiveUrbanDictionaryDefinion({ result: result.data, id }))
    })
    .catch(error => dispatch(failedUrbanDictionaryDictionarySearch(error)))
}

function requestOfficialDefinition({ id }) {
  return {
    data: id,
    type: actionTypes.REQUEST_OFFICIAL_DICTIONARY_SEARCH
  }
}

function receiveOfficialDefinition({ result, id }) {
  return {
    data: { result, id },
    type: actionTypes.RECEIVE_OFFICIAL_DICTIONARY_SEARCH
  }
}

function failedOfficialDictionarySearch(data) {
  return {
    data,
    type: actionTypes.FAILED_OFFICIAL_DICTIONARY_SEARCH

  }
}

function requestUrbanDictionaryDefinition({ id }) {
  return {
    data: id,
    type: actionTypes.REQUEST_URBAN_DICTIONARY_SEARCH
  }
}

function receiveUrbanDictionaryDefinion({ result, id }) {
  return {
    data: { result, id },
    type: actionTypes.RECEIVE_URBAN_DICTIONARY_SEARCH
  }
}

function failedUrbanDictionaryDictionarySearch(data) {
  return {
    data,
    type: actionTypes.FAILED_URBAN_DICTIONARY_SEARCH

  }
}
