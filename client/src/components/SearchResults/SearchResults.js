import React, { Component } from 'react';
import "./SearchResults.css"
import * as statuses from 'constants/statuses';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import OfficialDictionaryResults from "components/OfficialDictionaryResults/OfficialDictionaryResults";
import UrbanDictionaryResults from "components/UrbanDictionaryResults/UrbanDictionaryResults";
import ThesaurusResults from "components/ThesaurusResults/ThesaurusResults";

export default class SearchResult extends Component {
  conditionalRender = ({ status, result }) => {
    switch (status) {
      case(statuses.REQUESTED):
        return <LoadingSpinner/>;
      case(statuses.RECEIVED):
        return result;
      default:
        return null
    }
  }

  renderSearchResults = () =>{
    const { word, officialDictionarySearch, urbanDictionarySearch, thesaurusTermsSearch } = this.props;
    const resultsSet = [
      { result: officialDictionarySearch, Component: OfficialDictionaryResults },
      { result: urbanDictionarySearch, Component: UrbanDictionaryResults },
      { result: thesaurusTermsSearch, Component: ThesaurusResults },
    ];

    return word && word !== "" ?
      (
        <div
          key={ word }
          className={ `Search-Result` }
        >
          <div className={ `Search-Word` }>
            { word }
          </div>

          <div className={ `Result-Sections` }>
            { resultsSet.map((resultSet, index) => {
              const { result, Component } = resultSet;
              return result ? <Component { ...result } key={`${index}`} conditionalRender={ this.conditionalRender }/> : null
            })
            }
          </div>
        </div>
      )
      :
      null
  }


  render() {
    return (
      <div className={ `Search-Results` }>
        <div className={ `Search-Result-Headings` }>
          <div className={ `Word-Heading` }>
            Word
          </div>
          <div className={ `Result-Sections-Headings` }>
            <div className={ `Result-Heading` }>
              Official Definition
            </div>
            <div className={ `Result-Heading` }>
              Official Etymology
            </div>
            <div className={ `Result-Heading` }>
              Urban Dictionary Definition
            </div>
            <div className={ `Result-Heading` }>
              Thesaurus
            </div>
          </div>
        </div>

        { this.renderSearchResults() }
      </div>
    )
  }

}
