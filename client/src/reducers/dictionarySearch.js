import * as actionTypes from 'constants/actionTypes/dictionarySearch';

const initialState = {
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
  }
};

function setWord(state, action) {
  return { ...state, word: action.data }
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
  const results = action.data.response.results[ 0 ];
  const entries = results.lexicalEntries[ 0 ].entries[ 0 ]
  const { etymologies } = entries;
  const { definitions } = entries.senses[ 0 ];
  const data = { etymologies, definitions };
  const officialDictionarySearch = {
    ...state.officialDictionarySearch,
    data,
    requestStatus: 'RECEIVED'
  };

  return { ...state, officialDictionarySearch }
}

function receiveUrbanDictionarySearch(state, action) {
  const definitions = [];
  definitions[0] = action.data.list[0].definition;
  const urbanDictionarySearch = {
    ...state.urbanDictionarySearch,
    data:{
      definitions
    },
    requestStatus: 'RECEIVED'
  };

  return { ...state, urbanDictionarySearch }
}

function requestOfficialDictionarySearch(state) {
  const officialDictionarySearch = {
    ...state.officialDictionarySearch,
    requestStatus: 'REQUESTED'
  };

  return { ...state, officialDictionarySearch }
}

function requestUrbanDictionarySearch(state) {
  const urbanDictionarySearch = {
    ...state.urbanDictionarySearch,
    requestStatus: 'REQUESTED'
  };

  return { ...state, urbanDictionarySearch }
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
      return requestOfficialDictionarySearch(state);
    case actionTypes.REQUEST_URBAN_DICTIONARY_SEARCH:
      return requestUrbanDictionarySearch(state);
    default:
      return state

  }
}
