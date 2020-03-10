import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import AddressList from './AddressList';
import SocialBar from '../components/Social-Bar';
import { connect } from 'react-redux';
import { fetchAddresses } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import '../components/Social-Bar.css';

function AsyncApp(props) {
  console.log(props)
  const dispatch = useDispatch();
  const addresses = useSelector(state => state.addresses);
  const visibilityFilter = useSelector(state => state.visibilityFilter);

  useEffect(() => {
    dispatch(fetchAddresses());
  }, []);

  return (
    <>
      <div
        id="mySidepanel"
        style={{
          backgroundColor: '#d1c4e9',
          width: 'fit-content',
          padding: '4px 30px 4px 5px',

          opacity: '0.9'
        }}
      >
        <SocialBar
          size={40}
          style={{
            display: 'flex',
            width: 'fit-content',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        />
      </div>
      <span onClick = {() => {dispatch({type: visibilityFilter.SET_VISIBILITY_FILTER, filter: 'SHOW_BLOCKED'})}}>show blocked</span>
      <AddressList
        addresses={addresses.addresses}
      />
    </>
  );
}
export default AsyncApp;
