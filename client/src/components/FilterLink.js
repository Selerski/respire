import React from 'react';
import './FilterLink.css';
import FilterListIcon from '@material-ui/icons/FilterList';

const FilterLink = ({ filter, dispatch }) => {
  const node =
    filter === 'SHOW_ALL' ? (
      <span
        className="filter"
        onClick={() => {
          dispatch({ type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_BLOCKED' });
        }}
      >
        <div className="filter-icon">
          <FilterListIcon></FilterListIcon> <p>ALL</p>
        </div>
      </span>
    ) : (
      <span
        className="filter"
        onClick={() => {
          dispatch({ type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_ALL' });
        }}
      >
        <div className="filter-icon">
          <FilterListIcon className="icon"></FilterListIcon> <p>BLOCKED</p>
        </div>
      </span>
    );

  return <div className="empty">{node}</div>;
};

export default FilterLink;
