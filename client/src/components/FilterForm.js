import React, { useState } from 'react';
import './Text-Input.css';

const FilterForm = (props) => {

  const [filter, setFilter] = useState('');

  function handleFilter (e) {
    setFilter(e.target.value);
    props.onFilter(e.target.value);
  }

  return (
    <div className="field">
    <input type="text" 
           id="filter" 
           value={filter}
           placeholder="search visited domains"
           onChange={(e) => handleFilter(e)}
           />
  </div>
  )

}

export default FilterForm