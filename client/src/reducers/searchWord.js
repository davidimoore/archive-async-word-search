import * as actionTypes from 'constants/actionTypes/dictionarySearch';

const initialState = {
  word: null
};

function setWord(state, action) {
  const { word } = action.data;
  return { ...state, word }
}

export default function searchWord(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_WORD:
      return setWord(state, action);
    default:
      return state
  }
}
