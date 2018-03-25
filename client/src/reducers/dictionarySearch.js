import * as actionTypes from 'constants/actionTypes/dictionarySearch';

const initialState = {
  data: null,
  requestStatus: null
};

function failDictionarySearch(state, action){
  const { data } = action;
  return {
    ...state,
    data,
    requestStatus: 'FAILED'
  }
}

function receiveDictionarySearch(state, action) {
  console.log(action)
  const { data } = action;
  return {
    ...state,
    data,
    requestStatus: 'RECEIVED'
  }
}

function requestDictionarySearch(state) {
  return {
    ...state, requestStatus: 'REQUESTED'
  }
}


export default function dictionarySearch(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FAILED_DICTIONARY_SEARCH:
      return failDictionarySearch(state, action);
    case actionTypes.RECEIVE_DICTIONARY_SEARCH:
      return receiveDictionarySearch(state, action);
    case actionTypes.REQUEST_DICTIONARY_SEARCH:
      return requestDictionarySearch(state);
    default:
      return state

  }
}
