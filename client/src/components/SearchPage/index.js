import React from 'react';
import TextForm from 'components/TextForm'
import SearchResult from 'components/SearchResult';
import './SearchPage.css';

export default function SearchPage(props) {
  const { fetchWord } = props;

  return (
    <div
      className={ `SearchPage` }
    >
      <div className={ `Section` }>
        <TextForm
          submitHandler={ fetchWord }
        />
      </div>
      <div className={ `Section` }>
        <SearchResult
          {...props}
        />
      </div>
    </div>
  )
}

