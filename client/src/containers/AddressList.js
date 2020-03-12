import React, { useState } from 'react';
import Address from '../components/Address';
import { VisibilityFilters, SET_VISIBILITY_FILTER } from '../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import './AddressList.css';
import FilterLink from '../components/FilterLink';
import { StickyContainer, Sticky } from 'react-sticky';
import FilterForm from '../components/FilterForm';

const getVisibleAddresses = (addresses, filter, searchString) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return addresses;
    case VisibilityFilters.SHOW_BLOCKED:
      return addresses.filter(a => a.blockedStatus === 'Blocked');
    case VisibilityFilters.SHOW_SEARCHED:
      if (!searchString || searchString.length === 0) {
        return addresses;
      }
      return addresses.filter(a => {
        if (a.domain) {
          return a.domain.indexOf(searchString.toLowerCase()) !== -1;
        }
        return null;
      });

    default:
      throw new Error('Unknown filter: ' + filter);
  }
};

const AddressList = ({ addresses }) => {
  const [searchString, setSearchString] = useState(null);
  const visibilityFilter = useSelector(state => state.visibilityFilter);
  const filteredAddresses = getVisibleAddresses(
    addresses,
    visibilityFilter,
    searchString
  );
  const dispatch = useDispatch();

  function handleSearch(str) {
    if (str.length < 1) {
      dispatch({ type: SET_VISIBILITY_FILTER, filter: 'SHOW_ALL' });
      setSearchString(null);
      return;
    }
    setSearchString(str);
    dispatch({ type: SET_VISIBILITY_FILTER, filter: 'SHOW_SEARCHED' });
  }

  return (
    <>
      <FilterForm onFilter={handleSearch} />
      <StickyContainer className="sticky-container">
        <Sticky>
          {({ style }) => (
            <div
              style={{
                ...style,
                left: 'none',
                display: 'flex',
                alignItems: 'center',
                width: '90%',
                borderBottom: '1px #673ab7 solid',
                margin: '0 2rem',
                height: '50px'
              }}
            >
              <div className="name">Domain</div>
              <div className="block">Timed? (Y/N)</div>
              <div className="time">Duration (h:m) </div>
              <FilterLink filter={visibilityFilter} dispatch={dispatch} />
            </div>
          )}
        </Sticky>
      </StickyContainer>
      <div className="list-container">
        <div className="address-list">
          {filteredAddresses.map(address => (
            <Address
              key={address._id}
              blockedStatus={address.blockedStatus}
              address={address}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default AddressList;
