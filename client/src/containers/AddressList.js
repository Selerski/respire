import React, { useState } from 'react';
import Address from '../components/Address';
import { VisibilityFilters, SET_VISIBILITY_FILTER } from '../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import './AddressList.css';
import FilterLink from '../components/FilterLink';
import FilterForm from '../components/FilterForm';

const getVisibleAddresses = (addresses, filter, searchString) => {
  console.log('search string:', searchString);
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return addresses
    case VisibilityFilters.SHOW_BLOCKED:
      return addresses.filter(a => a.blockedStatus === 'Blocked')
    case VisibilityFilters.SHOW_SEARCHED:
      if (!searchString || searchString.length === 0) {return addresses}
      return addresses.filter(a => {
        return a.domain.indexOf(searchString.toLowerCase()) !== -1});
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const AddressList = ({addresses}) => {

  const [searchString, setSearchString] = useState(null);

  const visibilityFilter = useSelector(state => state.visibilityFilter);
  const filteredAddresses = getVisibleAddresses(addresses, visibilityFilter, searchString);
  const dispatch = useDispatch();
  
  function handleSearch (str) {
    if (str.length < 1) {
      dispatch({type: SET_VISIBILITY_FILTER, filter: 'SHOW_ALL'})
      setSearchString(null);
      return
    }
    setSearchString(str);
    dispatch({type: SET_VISIBILITY_FILTER, filter: 'SHOW_SEARCHED'});
  }

  return (
    <div className="address-list">
      <FilterForm onFilter={handleSearch}/>
      <FilterLink filter={visibilityFilter} dispatch={dispatch}/>
      {filteredAddresses.map(address => <Address key={address._id} blockedStatus={address.blockedStatus} address={address}/>)}
    </div>
  )

}

export default AddressList;