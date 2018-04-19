import React from 'react';

export default function UrbanDictionaryResults(props) {
  const { conditionalRender, data, requestStatus } = props;
  const { definitions } = data;
  return (
    <div className={ `Result-Section` }>
      <div className={ `Result` }>
        { conditionalRender({
          status: requestStatus,
          result:
            (definitions &&
              definitions.map((definition, index) =>
                <div key={ `definition-${index}` }>
                { definition }
                </div>
              )
            )
        }) }
      </div>
    </div>
  )
}
