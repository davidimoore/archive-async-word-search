import * as actionTypes from 'constants/actionTypes/dictionarySearch';
import * as statuses from 'constants/statuses';
/*id: null,
word: null,
urbanDictionarySearch: {
  data: {
    definitions: []
  },
  requestStatus: null
},
officialDictionarySearch: {
  data: {
    etymologies: [],
    definitions: []
  },
  requestStatus: null
}*/

const initialState = {
  entries: []
};

function setWord(state, action) {
  if (state.entries.find(entry => entry.word === action.data.word)) {
    return
  }
  return {
    ...state,
    entries: state.entries.concat(action.data)
  }
}

function failUrbanDictionarySearch(state, action) {
  const { data } = action.data;
  return {
    ...state.urbanDictionarySearch,
    data,
    requestStatus: 'FAILED'
  }
}

function failOfficialDictionarySearch(state, action) {
  const { data } = action.data;
  return {
    ...state.officialDictionarySearch,
    data,
    requestStatus: 'FAILED'
  }
}

function receiveOfficialDictionarySearch(state, action) {
  const responseResults = action.data.result.response.results[ 0 ];
  const responseResultsEntries = responseResults.lexicalEntries[ 0 ].entries[ 0 ]
  const { etymologies } = responseResultsEntries;
  const { definitions } = responseResultsEntries.senses[ 0 ];
  const data = { etymologies, definitions };
  const officialDictionarySearch = {
    ...state.officialDictionarySearch,
    data,
    requestStatus: statuses.RECEIVED
  };

  const entries = state.entries.map(stateEntry => {
    if (stateEntry.id === action.data.id) {
      return { ...stateEntry, officialDictionarySearch }
    } else {
      return stateEntry
    }
  });

  return { ...state, entries }
}

function receiveUrbanDictionarySearch(state, action) {
  const definitions = [];
  definitions[ 0 ] = action.data.result.list[ 0 ].definition;
  const urbanDictionarySearch = {
    ...state.urbanDictionarySearch,
    data: {
      definitions
    },
    requestStatus: statuses.RECEIVED
  };

  const entries = state.entries.map(stateEntry => {
    if (stateEntry.id === action.data.id) {
      return { ...stateEntry, urbanDictionarySearch }
    } else {
      return stateEntry
    }
  });

  return { ...state, entries }
}

function requestOfficialDictionarySearch(state, action) {
  const entries = state.entries.map(stateEntry => {
    if (stateEntry.id === action.data) {
      const officialDictionarySearch = {
        requestStatus: statuses.REQUESTED
      };
      return { ...stateEntry, officialDictionarySearch }
    } else {
      return stateEntry
    }
  });

  return { ...state, entries }
}

function requestUrbanDictionarySearch(state, action) {
  const entries = state.entries.map(stateEntry => {
    if (stateEntry.id === action.data) {
      const urbanDictionarySearch = {
        requestStatus: statuses.REQUESTED
      };
      return { ...stateEntry, urbanDictionarySearch }
    } else {
      return stateEntry
    }
  });

  return { ...state, entries }
}

export default function dictionarySearch(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_WORD:
      return setWord(state, action);
    case actionTypes.FAILED_OFFICIAL_DICTIONARY_SEARCH:
      return failOfficialDictionarySearch(state, action);
    case actionTypes.FAILED_URBAN_DICTIONARY_SEARCH:
      return failUrbanDictionarySearch(state, action);
    case actionTypes.RECEIVE_OFFICIAL_DICTIONARY_SEARCH:
      return receiveOfficialDictionarySearch(state, action);
    case actionTypes.RECEIVE_URBAN_DICTIONARY_SEARCH:
      return receiveUrbanDictionarySearch(state, action);
    case actionTypes.REQUEST_OFFICIAL_DICTIONARY_SEARCH:
      return requestOfficialDictionarySearch(state, action);
    case actionTypes.REQUEST_URBAN_DICTIONARY_SEARCH:
      return requestUrbanDictionarySearch(state, action);
    default:
      return state

  }
}
