import React from 'react';

export default function OfficialDictionaryResults(props) {
  const { conditionalRender, data, requestStatus } = props;
  const { definitions, etymologies } = data;

  return (
    <React.Fragment>
      <div className={ `Result-Section` }>
        <div className={ `Result` }>
          { conditionalRender({
            status: requestStatus,
            result: (definitions &&
              definitions.map((definition, index) => <span
                key={ `definition-${index}` }>
                { definition }</span>)
            )
          }) }
        </div>
      </div>
      <div className={ `Result-Section` }>
        <div className={ `Result` }>
          { conditionalRender({
            status: requestStatus,
            result: etymologies &&
            etymologies.map((etymology, index) => <span
              key={ `etymology-${index}` }>{ etymology }</span>)
          }) }
        </div>
      </div>
    </React.Fragment>
  )
}
