import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  receiveAddresses,
  fetchAddresses
} from '../redux/actions';

function AsyncApp({dispatch}) {

  useEffect(() => {
    dispatch(fetchAddresses());
  });

  return (
    <div>

    </div>
  );
}


function mapStateToProps(state) {
  console.log(state);
  const { addresses } = state;

  return {
    addresses
    };
}

export default connect(mapStateToProps)(AsyncApp);
