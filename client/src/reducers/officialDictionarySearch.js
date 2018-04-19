import * as actionTypes from 'constants/actionTypes/dictionarySearch';
import * as statuses from 'constants/statuses';

const initialState = {
  data: {
    etymologies: [],
    definitions: []
  },
  requestStatus: null

};

function getData(state, action) {
  const { result } = action.data;
  if (result && result.response && result.response.results.length > 0) {
    const responseResults = action.data.result.response.results[ 0 ];
    const responseResultsEntries = responseResults.lexicalEntries[ 0 ].entries[ 0 ]
    const { etymologies } = responseResultsEntries;
    const { definitions } = responseResultsEntries.senses[ 0 ];
    return { ...state.data, etymologies, definitions }
  } else {
    return { ...state.data, ...initialState.data }
  }
}

function receiveOfficialDictionarySearch(state, action) {

  return {
    ...state, data: getData(state, action),
    requestStatus: statuses.RECEIVED
  }

}

function failOfficialDictionarySearch(state, action) {
  const { data } = action.data;
  return {
    ...state,
    data,
    requestStatus: statuses.FAILED
  }
}

function requestOfficialDictionarySearch(state) {
  return { ...state, requestStatus: statuses.REQUESTED }
}


export default function officialDictionarySearch(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FAILED_OFFICIAL_DICTIONARY_SEARCH:
      return failOfficialDictionarySearch(state, action);
    case actionTypes.RECEIVE_OFFICIAL_DICTIONARY_SEARCH:
      return receiveOfficialDictionarySearch(state, action);
    case actionTypes.REQUEST_OFFICIAL_DICTIONARY_SEARCH:
      return requestOfficialDictionarySearch(state);
    default:
      return state

  }
}
