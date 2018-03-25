import React from 'react';
import TextForm from 'components/TextForm'
import SearchResult from 'components/SearchResult';
import './SearchPage.css';

export default function SearchPage(props) {
  const { submitHandler } = props;

  return (
    <div
      className={ `SearchPage` }
    >
      <div className={ `Section` }>
        <TextForm
          submitHandler={ submitHandler }
        />
      </div>
      <div className={ `Section` }>
        <SearchResult
        />
      </div>
    </div>
  )
}

