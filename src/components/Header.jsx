import React from 'react';
import FilterByDate from './TodoList/FilterByDate';
import Search from './TodoList/Search';

const AddNewStyle = {
  cursor: 'pointer',
};

const Header = ({ modalFunc, handleFilterByDate, searchText, handleSearch }) => {
  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand mt-1">
          <img className="mb-2"
               src="https://cdn2.iconfinder.com/data/icons/productivity/256/To_Do_List-512.png"
               width="30" height="30" alt=""/>
          <span className="font-weight-bold">Doo-li</span>
        </a>
        <img style={AddNewStyle} onClick={() => modalFunc()} className="ml-auto d-lg-none mr-3"
             src="https://cdn3.iconfinder.com/data/icons/stroke/53/Button-512.png" width="30"
             height="30" alt=""/>
        <button className="navbar-toggler" type="button" data-toggle="collapse"
                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"/>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">

          <div className="col row mx-auto d-flex justify-content-center">
            <Search
              searchText={searchText}
              changeFunc={handleSearch}
            />
            <FilterByDate handleFilterByDate={handleFilterByDate}/>
          </div>

          <img style={AddNewStyle}
               onClick={() => modalFunc()}
               className="ml-auto d-none d-lg-block"
               src="/images/Button-512.png"
               width="30"
               height="30"
               alt=""/>
        </div>
      </nav>
    </header>
  );
};

export default Header;
