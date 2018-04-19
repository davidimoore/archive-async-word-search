import * as actionTypes from 'constants/actionTypes/dictionarySearch';
import * as statuses from 'constants/statuses';

const initialState = {
  data: {
    definitions: []
  },
  requestStatus: null
};

function failUrbanDictionarySearch(state, action) {
  const { data } = action.data;
  return {
    ...state,
    data,
    requestStatus: statuses.FAILED
  }
}

function getData(state, action) {
  const { result } = action.data;
  if (result.list.length > 0) {
    const definitions = result.list.map(resultList => {
      const { definition } = resultList;
      return definition
    })
    return { ...state.data, definitions }
  } else {
    return { ...state.data, ...initialState.data }
  }
}

function receiveUrbanDictionarySearch(state, action) {
  return {
    ...state,
    data: getData(state, action),
    requestStatus: statuses.RECEIVED
  };
}


function requestUrbanDictionarySearch(state) {
  return { ...state, requestStatus: statuses.REQUESTED }
}

export default function urbanDictionarySearch(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FAILED_URBAN_DICTIONARY_SEARCH:
      return failUrbanDictionarySearch(state, action);
    case actionTypes.RECEIVE_URBAN_DICTIONARY_SEARCH:
      return receiveUrbanDictionarySearch(state, action);
    case actionTypes.REQUEST_URBAN_DICTIONARY_SEARCH:
      return requestUrbanDictionarySearch(state);
    default:
      return state

  }
}
