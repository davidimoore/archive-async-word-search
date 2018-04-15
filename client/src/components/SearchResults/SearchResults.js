import React, { Component } from 'react';
import "./SearchResults.css"

export default class SearchResult extends Component {
  renderOfficialResults(officialDictionarySearch) {
    const { requestStatus } = officialDictionarySearch;
    if (requestStatus === 'RECEIVED') {
      const { data } = officialDictionarySearch;

      const { definitions, etymologies } = data;
      return (
        <React.Fragment>
          <div className={ `Result-Section` }>
            <div className={ `Result` }>
              { definitions ? definitions.map((definition, index) => <span
                key={ `definition-${index}` }>{ definition }</span>) : null }
            </div>
          </div>
          <div className={ `Result-Section` }>
            <div className={ `Result` }>
              { etymologies ? etymologies.map((etymology, index) => <span
                key={ `etymology-${index}` }>{ etymology }</span>) : null }
            </div>
          </div>
        </React.Fragment>
      )
    } else {
      return null
    }
  }

  renderUrbanDictionaryResults(urbanDictionarySearch) {
    const { requestStatus } = urbanDictionarySearch;
    if (requestStatus === 'RECEIVED') {
      const { definitions } = urbanDictionarySearch.data;
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
    return (
      <div className={ `Search-Word` }>
        { word || null }
      </div>
    )
  }

  render() {
return(
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
              </div>
            </div>

            { this.renderSearchResult() }
          </div>
  )


  }

  renderSearchResult() {
    const { word, officialDictionarySearch, urbanDictionarySearch } = this.props;
    return word && word !== "" ?
      (
        <div
          key={ word }
          className={ `Search-Result` }
        >
          { word && this.renderSearchWord(word) }

          <div className={ `Result-Sections` }>
            { officialDictionarySearch ? this.renderOfficialResults(officialDictionarySearch) : null }
            {
              urbanDictionarySearch ? this.renderUrbanDictionaryResults(urbanDictionarySearch) : null
            }
          </div>
        </div>
      )
      :
      null
  }

}
