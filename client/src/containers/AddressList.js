import React from 'react';
import Address from '../components/Address';
import { VisibilityFilters } from '../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import './AddressList.css';
import FilterLink from '../components/FilterLink';

const getVisibleAddresses = (addresses, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return addresses
    case VisibilityFilters.SHOW_BLOCKED:
      return addresses.filter(a => a.blockedStatus === 'Blocked')
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const AddressList = ({addresses}) => {

  const visibilityFilter = useSelector(state => state.visibilityFilter);
  const filteredAddresses = getVisibleAddresses(addresses, visibilityFilter);
  const dispatch = useDispatch();
  
  return (
    <div className="address-list">
      <FilterLink filter={visibilityFilter} dispatch={dispatch}/>
      {filteredAddresses.map(address => <Address key={address._id} blockedStatus={address.blockedStatus} address={address}/>)}
    </div>
  )

}

export default AddressList;