import React, { useState } from 'react';
import './FilterForm.css';

const FilterForm = props => {
  const [filter, setFilter] = useState({
    value: '',
    active: false,
    label: 'Filter by Name'
  });

  function handleFilter(e) {
    setFilter({...filter, value: e.target.value});
    props.onFilter(e.target.value);
  }
  

  return (
    <div className={filter.active ? 'field active': 'field'}>
      <input
        type="text"
        id="filter"
        value={filter.value}
        placeholder={filter.label}
        onFocus={e => setFilter({ ...filter, active: true })}
        onBlur={e => setFilter({ ...filter, active: false })}
        onChange={e => handleFilter(e)}
      />
    </div>
  );
};

export default FilterForm;
