import React from 'react';
import TextForm from 'components/TextForm'
import SearchResults from 'components/SearchResults/SearchResults';
import './SearchPage.css';

export default function SearchPage(props) {
  const { fetchWord } = props;

  return (
    <div
      className={ `SearchPage` }
    >
      <div className={ `Search-Section` }>
        <TextForm
          submitHandler={ fetchWord }
        />
      </div>
      <div className={ `Result-Section` }>
        {  <SearchResults {...props} /> }
      </div>
    </div>
  )
}

