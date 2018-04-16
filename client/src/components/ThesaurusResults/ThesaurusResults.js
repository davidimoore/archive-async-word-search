import React from 'react';

export default function ThesaurusResults(props) {
  const { conditionalRender, data, requestStatus } = props;
  const { terms } = data;
  return (
    <div className={ `Result-Section` }>
      <div className={ `Result` }>
        { conditionalRender({
          status: requestStatus,
          result: (terms ?
              terms.map((term, index) => {
                  const { wordType, antonyms, synonyms } = term
                  return (
                    <span key={ `definition-${index}` }>
                      <div>
                      {
                        `${wordType.toUpperCase()}: \n
                          ${antonyms && `\n antonyms: ${antonyms} \n`}
                          ${synonyms && `\n synonyms: ${synonyms} \n`}
                        `
                      }
                      </div>
                    </span>
                  )
                }
              )
              :
              null
          )
        }) }
      </div>
    </div>

  )
}
