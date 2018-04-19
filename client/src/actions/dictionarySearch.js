import { getRequest } from 'api/request';
import * as actionTypes from 'constants/actionTypes/dictionarySearch';
import * as urls from 'constants/urls'

export function fetchWord(word) {
  return dispatch => {
    dispatch(setWord({ word }));
    dispatch(requestOfficialDefinition());
    dispatch(requestUrbanDictionaryDefinition());
    dispatch(requestThesaurusTermsSearch());
    fetchOfficialWord({ dispatch, word });
    fetchUrbanDictionaryDefinition({ dispatch, word });
    fetchThesaurusTermsSearch({ dispatch, word })
  }
}

function setWord({ word }) {
  return {
    data: { word },
    type: actionTypes.SET_WORD
  }
}

function fetchOfficialWord({ dispatch, word }) {
  return getRequest({ url: `${urls.webstersSearchURL}/${word}` })
    .then(result => {
      dispatch(receiveOfficialDefinition({ result: result.data }))
    })
    .catch(error => dispatch(failedOfficialDictionarySearch(error)))
}

function fetchThesaurusTermsSearch({ dispatch, word }) {
  return getRequest({ url: `${urls.thesaurusSearchUrl}/${word}/json` })
    .then(result => {
      dispatch(receiveThesaurusTermsSearch({ result: result.data }))
    })
    .catch(error => dispatch(failedThesaurusTermsSearch(error)))
}

function fetchUrbanDictionaryDefinition({ dispatch, word }) {
  return getRequest({ url: `${urls.urbanDictionarySearchUrl}?term=${word}` })
    .then(result => {

      dispatch(receiveUrbanDictionaryDefinion({ result: result.data }))
    })
    .catch(error => dispatch(failedUrbanDictionaryDictionarySearch(error)))
}

function requestThesaurusTermsSearch() {
  return {
    type: actionTypes.REQUEST_THESAURUS_TERMS_SEARCH
  }
}

function receiveThesaurusTermsSearch({ result }) {
  return {
    data: { result },
    type: actionTypes.RECEIVE_THESAURUS_TERMS_SEARCH
  }
}

function requestOfficialDefinition() {
  return {
    type: actionTypes.REQUEST_OFFICIAL_DICTIONARY_SEARCH
  }
}

function receiveOfficialDefinition({ result }) {
  return {
    data: { result },
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

function receiveUrbanDictionaryDefinion({ result }) {
  return {
    data: { result },
    type: actionTypes.RECEIVE_URBAN_DICTIONARY_SEARCH
  }
}

function failedUrbanDictionaryDictionarySearch(data) {
  return {
    data,
    type: actionTypes.FAILED_URBAN_DICTIONARY_SEARCH

  }
}

function failedThesaurusTermsSearch(data) {
  return {
    data,
    type: actionTypes.FAILED_THESAURUS_TERMS_SEARCH

  }
}
