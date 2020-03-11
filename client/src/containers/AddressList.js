import React from 'react';
import Address from '../components/Address';
import { VisibilityFilters } from '../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import './AddressList.css';
import FilterLink from '../components/FilterLink';
import { StickyContainer, Sticky } from 'react-sticky';

const getVisibleAddresses = (addresses, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return addresses;
    case VisibilityFilters.SHOW_BLOCKED:
      return addresses.filter(a => a.blockedStatus === 'Blocked');
    default:
      throw new Error('Unknown filter: ' + filter);
  }
};
const style = {
  fontWeight: 'bold'
};

const AddressList = ({ addresses }) => {
  const visibilityFilter = useSelector(state => state.visibilityFilter);
  const filteredAddresses = getVisibleAddresses(addresses, visibilityFilter);
  const dispatch = useDispatch();

  return (
    <>
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
              <div className="time">Duration</div>
              <FilterLink filter={visibilityFilter} dispatch={dispatch}/>
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
