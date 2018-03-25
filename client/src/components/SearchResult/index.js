import React, { Component } from 'react';
import "./SearchResult.css"

export default class SearchResult extends Component {
  renderOfficialResults() {
    const { requestStatus } = this.props.officialDictionarySearch;
    if (requestStatus === 'RECEIVED') {
      const { definitions, etymologies } = this.props.officialDictionarySearch.data;
      return (
        <React.Fragment>
          <div className={ `Result-Section` }>
            <div className={ `title` }>
              <h3>
                Oxford Definitions
              </h3>
            </div>
            <div className={ `Result` }>
              { definitions && definitions.map((definition, index) => <span
                key={ `definition-${index}` }>{ definition }</span>) }
            </div>
          </div>
          <div className={ `Result-Section` }>
            <div className={ `title` }>
              <h3>
                Oxford Etymologies
              </h3>
            </div>
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

  renderUrbanDictionaryResults() {
    const { requestStatus } = this.props.urbanDictionarySearch;
    if (requestStatus === 'RECEIVED') {
      const { definitions } = this.props.urbanDictionarySearch.data;
      return (
        <React.Fragment>
          <div className={ `Result-Section` }>
            <div className={ `title` }>
              <h3>
                Urban Dictionary Definitions
              </h3>
            </div>
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

  renderSearchWord() {
    const { word } = this.props;
    return word && (
      <div className={ `Search-Word` }>
        <div className={ `title` }>
          <h3>
            Word
          </h3>
        </div>
        <div className={ `Search-Word` }>
          { word }
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className={ `Search-Result` }>
        { this.renderSearchWord() }
        <div className={ `Result-Sections` }>
          { this.renderOfficialResults() }
          { this.renderUrbanDictionaryResults() }
        </div>
      </div>
    )
  }

}
