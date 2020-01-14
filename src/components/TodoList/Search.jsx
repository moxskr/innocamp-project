import React from 'react';

const Search = ({ searchText, changeFunc }) => {
  return (
    <input onChange={changeFunc} value={searchText} className="form-control col-md-3" type="search"
           placeholder="Search..."
           aria-label="Search"/>
  );
};

export default Search;
