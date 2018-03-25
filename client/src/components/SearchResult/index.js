import React from 'react';
import "./SearchResult.css"

export default function SearchResult() {
  const result =
    {
      word: 'hat',
      definition: 'a shaped covering for the head worn for warmth, as a fashion item, or as part of a uniform',
      etymoloygies: [
        "Old English hætt, of Germanic origin; related to Old Norse hǫttr ‘hood’, also to hood"
      ]
    };

  const { word, definition, etymoloygies } = result;

  return (
    <div className={ `Search-Result` }>
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
      <div className={ `Result-Sections` }>
        <div className={ `Result-Section` }>
          <div className={ `title` }>
            <h3>
              Webster's Definition
            </h3>
          </div>
          <div className={ `Result` }>
            { definition }
          </div>
        </div>
        <div className={ `Result-Section` }>
          <div className={ `title` }>
            <h3>
              Webster's Etymologies
            </h3>
          </div>
          <div className={ `Result` }>
            { etymoloygies.map((etymology, index) => <span key={`etymology-${index}`}>{ etymology }</span>) }
          </div>
        </div>
      </div>
    </div>
  )
}
