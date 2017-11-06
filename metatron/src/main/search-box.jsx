import React from 'react';
import { FaSearch } from 'react-icons/lib/fa';

import { store } from '../misc/remote-factory';
import { setFilter } from './main-actions';


const handleChange = event => store.dispatch(setFilter(event.target.value));

const SearchBox = ({type, onChange, value, ...props}) => {
  const { filter } = store.getState();
  return (
    <div className="search-box">
      <FaSearch size={30} />
      <input {...props} type="text" onChange={handleChange} value={filter} />
    </div>
  );
};

export default SearchBox;
