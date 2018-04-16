import * as actionTypes from 'constants/actionTypes/dictionarySearch';
import * as statuses from 'constants/statuses';

const initialState = {
  word: null,
  officialDictionarySearch: {
    data: {
      etymologies: null,
      definitions: null
    },
    requestStatus: null
  },
  urbanDictionarySearch: {
    data: {
      definitions: null
    },
    requestStatus: null
  },
  thesaurusTermsSearch: {
    data: {
      terms: null
    },
    requestStatus: null
  }
};

function setWord(state, action) {
  const { word } = action.data;
  return { ...state, word }
}

function failUrbanDictionarySearch(state, action) {
  const { data } = action.data;
  return {
    ...state.urbanDictionarySearch,
    data,
    requestStatus: statuses.FAILED
  }
}

function failOfficialDictionarySearch(state, action) {
  const { data } = action.data;
  return {
    ...state.officialDictionarySearch,
    data,
    requestStatus: statuses.FAILED
  }
}

function failThesaurusTermsSearch(state, action) {
  const { data } = action.data;
  return {
    ...state.thesaurusTermsSearch,
    data,
    requestStatus: statuses.FAILED
  }
}

function receiveOfficialDictionarySearch(state, action) {
  const responseResults = action.data.result.response.results[ 0 ];
  const responseResultsEntries = responseResults.lexicalEntries[ 0 ].entries[ 0 ]
  const { etymologies } = responseResultsEntries;
  const { definitions } = responseResultsEntries.senses[ 0 ];

  const officialDictionarySearch = {
    ...state.officialDictionarySearch,
    data: { etymologies, definitions },
    requestStatus: statuses.RECEIVED
  };

  return { ...state, officialDictionarySearch }
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

  return { ...state, urbanDictionarySearch }
}

function requestOfficialDictionarySearch(state) {
  const officialDictionarySearch = {
    ...state.officialDictionarySearch,
    requestStatus: statuses.REQUESTED
  };

  return { ...state, officialDictionarySearch }
}

function requestUrbanDictionarySearch(state) {
  const urbanDictionarySearch = {
    ...state.urbanDictionarySearch,
    requestStatus: statuses.REQUESTED
  };

  return { ...state, urbanDictionarySearch }
}

function requestThesaurusTermsSearch(state) {
  const thesaurusTermsSearch = {
    ...state.thesaurusTermsSearch,
    requestStatus: statuses.REQUESTED
  };

  return { ...state, thesaurusTermsSearch }
}

function getWordTypeExamples(wordTypeExamples) {
  if (wordTypeExamples && wordTypeExamples.length > 0) {
    return wordTypeExamples.reduce((all, word, index) => {
      if (index === 0) {
        all = `${word}`
      } else if (index === wordTypeExamples.length - 1) {
        all = `${all} ${word}`
      } else {
        all = `${all}, ${word},`
      }
      return all
    }, "");
  }
}

function receiveThesaurusTermsSearch(state, action) {
  const thesaurusTermsSearch = {
    requestStatus: statuses.RECEIVED
  };
  const { result } = action.data;
  const wordTypes = Object.keys(result);

  if (wordTypes && wordTypes.length > 0) {
    const terms = wordTypes.map((wordType) => {
      const wordTypeObj = { wordType };
      const { ant, syn } = result[ wordType ];

      const [ antonyms, synonyms ] = [ getWordTypeExamples(ant), getWordTypeExamples(syn) ]
      if (antonyms) {
        wordTypeObj[ "antonyms" ] = antonyms
      }

      if (synonyms) {
        wordTypeObj[ "synonyms" ] = synonyms
      }

      return wordTypeObj;
    });

    return { ...state, thesaurusTermsSearch: { ...thesaurusTermsSearch, data: {terms} } }
  } else {
    return { ...state, thesaurusTermsSearch }
  }
}

export default function dictionarySearch(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_WORD:
      return setWord(state, action);
    case actionTypes.FAILED_OFFICIAL_DICTIONARY_SEARCH:
      return failOfficialDictionarySearch(state, action);
    case actionTypes.FAILED_URBAN_DICTIONARY_SEARCH:
      return failUrbanDictionarySearch(state, action);
    case actionTypes.FAILED_THESAURUS_TERMS_SEARCH:
      return failThesaurusTermsSearch(state, action);
    case actionTypes.RECEIVE_OFFICIAL_DICTIONARY_SEARCH:
      return receiveOfficialDictionarySearch(state, action);
    case actionTypes.RECEIVE_URBAN_DICTIONARY_SEARCH:
      return receiveUrbanDictionarySearch(state, action);
    case actionTypes.RECEIVE_THESAURUS_TERMS_SEARCH:
      return receiveThesaurusTermsSearch(state, action);
    case actionTypes.REQUEST_OFFICIAL_DICTIONARY_SEARCH:
      return requestOfficialDictionarySearch(state);
    case actionTypes.REQUEST_URBAN_DICTIONARY_SEARCH:
      return requestUrbanDictionarySearch(state);
    case actionTypes.REQUEST_THESAURUS_TERMS_SEARCH:
      return requestThesaurusTermsSearch(state);
    default:
      return state

  }
}
