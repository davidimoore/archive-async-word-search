import * as actionTypes from 'constants/actionTypes/dictionarySearch';
import * as statuses from 'constants/statuses';

const initialState = {
  data: {
    terms: []
  },
  requestStatus: null
};

function failThesaurusTermsSearch(state) {
  return {
    ...state,
    requestStatus: statuses.FAILED
  }
}

function getData(action) {
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

    return { terms }
  } else {
    return initialState.data
  }
}

function receiveThesaurusTermsSearch(state, action) {
  return { ...state, data: getData(action), requestStatus: statuses.RECEIVED }

}

function requestThesaurusTermsSearch(state) {
  return { ...state, requestStatus: statuses.REQUESTED }
}

function getWordTypeExamples(wordTypeExamples) {
  if (wordTypeExamples && wordTypeExamples.length > 0) {
    return wordTypeExamples.reduce((all, word, index) => {
      if (index === wordTypeExamples.length - 1) {
        all = `${all} ${word}`;
      } else {
        all = `${all} ${word},`;
      }
      return all
    }, "");
  }
}

export default function dictionarySearch(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FAILED_THESAURUS_TERMS_SEARCH:
      return failThesaurusTermsSearch(state);
    case actionTypes.RECEIVE_THESAURUS_TERMS_SEARCH:
      return receiveThesaurusTermsSearch(state, action);
    case actionTypes.REQUEST_THESAURUS_TERMS_SEARCH:
      return requestThesaurusTermsSearch(state);
    default:
      return state

  }
}
