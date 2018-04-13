import React, { Component } from 'react';
import "./SearchResults.css"

export default class SearchResult extends Component {
  renderOfficialResults(officialDictionarySearch) {
    const { requestStatus } = officialDictionarySearch;
    if (requestStatus === 'RECEIVED') {
      const { definitions, etymologies } = officialDictionarySearch.data;
      return (
        <React.Fragment>
          <div className={ `Result-Section` }>
            <div className={ `Result` }>
              { definitions && definitions.map((definition, index) => <span
                key={ `definition-${index}` }>{ definition }</span>) }
            </div>
          </div>
          <div className={ `Result-Section` }>
            <div className={ `Result` }>
              { etymologies && etymologies.map((etymology, index) => <span
                key={ `etymology-${index}` }>{ etymology }</span>) }
            </div>
          </div>
        </React.Fragment>
      )
    } else {
      return null
    }
  }

  renderUrbanDictionaryResults(entry) {
    const { requestStatus } = entry.urbanDictionarySearch;
    if (requestStatus === 'RECEIVED') {
      const { definitions } = entry.urbanDictionarySearch.data;
      return (
        <React.Fragment>
          <div className={ `Result-Section` }>
            <div className={ `Result` }>
              { definitions && definitions.map((definition, index) => <span
                key={ `definition-${index}` }>{ definition }</span>) }
            </div>
          </div>
        </React.Fragment>
      )
    } else {
      return null
    }
  }

  renderSearchWord(word) {
    return(
      <div className={ `Search-Word` }>
        { word }
      </div>
    )
  }

  render() {
    const { entries } = this.props;
    return (
      entries && entries.map(entry => this.renderSearchResult(entry))
    )
  }

  renderSearchResult(entry) {
    const { word, officialDictionarySearch } = entry;
    return (
      <div
        key={ word }
        className={ `Search-Result` }>
        { word && this.renderSearchWord(word) }
        <div className={ `Result-Sections` }>
          { officialDictionarySearch && this.renderOfficialResults(officialDictionarySearch) }
          {
            //this.renderUrbanDictionaryResults()
          }


        </div>
      </div>
    )
  }

}
