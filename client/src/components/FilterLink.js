import React from 'react';


const FilterLink = ({filter, dispatch}) => {
  if (filter === 'SHOW_ALL') {
    return <span onClick = {() => {dispatch({type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_BLOCKED'})}}>show blocked</span> 
  } else {
    return <span onClick = {() => {dispatch({type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_ALL'})}}>show all</span>
  }
}

export default FilterLink;