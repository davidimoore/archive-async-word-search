import React from 'react';
import "./ThesaurusResults.css";

export default function ThesaurusResults(props) {
  const { conditionalRender, data, requestStatus } = props;
  const { terms } = data;

  return (
    <div className={ `Result-Section ThesaurusResults` }>
      <div className={ `Result ThesaurusResult` }>
        { conditionalRender({
          status: requestStatus,
          result: (terms && terms.map((term) => {
                const { wordType, antonyms, synonyms } = term;
                return (
                  <div className={ `WordType` } key={ `definition-${wordType}` }>
                    <div>{ `${wordType.toUpperCase()}:` }</div>
                    { antonyms && <div>antonyms: { antonyms } </div> }
                    { synonyms && <div>synonyms: { synonyms } </div> }
                  </div>
                )
              }
            )
          )
        }) }
      </div>
    </div>
  )
}
