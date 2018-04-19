import { combineReducers } from "redux";
import searchWord from "./searchWord";
import officialDictionarySearch from "./officialDictionarySearch";
import thesaurusTermsSearch from "./thesaurusTermsSearch";
import urbanDictionarySearch from "./urbanDictionarySearch";

const rootReducer = combineReducers({
  searchWord,
  officialDictionarySearch,
  thesaurusTermsSearch,
  urbanDictionarySearch
});

export default rootReducer;
